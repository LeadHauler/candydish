import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Pin,
  Star,
  Send,
  Trash2,
  LogIn,
} from "lucide-react";
import { format } from "date-fns";

const categories = [
  { value: "all", label: "All Posts" },
  { value: "success_story", label: "Success Stories" },
  { value: "tip", label: "Tips" },
  { value: "real_estate", label: "Real Estate" },
  { value: "contractors", label: "Contractors" },
  { value: "door_hangers", label: "Door Hangers" },
  { value: "vehicle_wraps", label: "Vehicle Wraps" },
  { value: "seasonal", label: "Seasonal" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
];

const categoryColors: Record<string, string> = {
  success_story: "bg-green-100 text-green-700",
  tip: "bg-amber-100 text-amber-700",
  real_estate: "bg-blue-100 text-blue-700",
  contractors: "bg-orange-100 text-orange-700",
  door_hangers: "bg-purple-100 text-purple-700",
  vehicle_wraps: "bg-teal-100 text-teal-700",
  seasonal: "bg-rose-100 text-rose-700",
  referral: "bg-indigo-100 text-indigo-700",
  community: "bg-emerald-100 text-emerald-700",
  digital: "bg-cyan-100 text-cyan-700",
  other: "bg-gray-100 text-gray-700",
};

type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  isFeatured: boolean;
  createdAt: Date;
  authorName: string | null;
  voteCount: number;
  commentCount: number;
};

export default function Community() {
  const { isAuthenticated, user } = useAuth();
  const [category, setCategory] = useState("all");
  const [postOpen, setPostOpen] = useState(false);
  const [postForm, setPostForm] = useState({ title: "", content: "", category: "tip" });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");

  const { data: posts, isLoading } = trpc.community.list.useQuery({ category: category === "all" ? undefined : category });
  const { data: comments } = trpc.community.comments.list.useQuery(
    { postId: selectedPost?.id ?? 0 },
    { enabled: !!selectedPost }
  );
  const utils = trpc.useUtils();

  const createPost = trpc.community.create.useMutation({
    onSuccess: () => {
      utils.community.list.invalidate();
      toast.success("Post shared with the community!");
      setPostOpen(false);
      setPostForm({ title: "", content: "", category: "tip" });
    },
  });

  const deletePost = trpc.community.delete.useMutation({
    onSuccess: () => { utils.community.list.invalidate(); toast.success("Post deleted."); setSelectedPost(null); },
  });

  const vote = trpc.community.vote.useMutation({
    onSuccess: () => utils.community.list.invalidate(),
    onError: () => toast.error("Sign in to vote"),
  });

  const createComment = trpc.community.comments.create.useMutation({
    onSuccess: () => {
      utils.community.comments.list.invalidate({ postId: selectedPost?.id });
      utils.community.list.invalidate();
      setComment("");
    },
  });

  const deleteComment = trpc.community.comments.delete.useMutation({
    onSuccess: () => utils.community.comments.list.invalidate({ postId: selectedPost?.id }),
  });

  const handleVote = (postId: number, v: "up" | "down") => {
    if (!isAuthenticated) { toast.error("Sign in to vote"); return; }
    vote.mutate({ postId, vote: v });
  };

  const handleComment = () => {
    if (!isAuthenticated) { toast.error("Sign in to comment"); return; }
    if (!comment.trim() || !selectedPost) return;
    createComment.mutate({ postId: selectedPost.id, content: comment });
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Community</h1>
          <p className="text-muted-foreground mt-1">Share tips, success stories, and learn from other junk removal owners.</p>
        </div>
        {isAuthenticated ? (
          <Button className="bg-primary text-primary-foreground" onClick={() => setPostOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />Share a Tip
          </Button>
        ) : (
          <Button variant="outline" onClick={() => (window.location.href = getLoginUrl())}>
            <LogIn className="w-4 h-4 mr-2" />Sign in to post
          </Button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              category === c.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className={`bg-card border rounded-xl p-5 hover:border-primary/20 hover:shadow-sm transition-all duration-200 cursor-pointer ${
                p.isPinned ? "border-amber-200 bg-amber-50/30" : "border-border"
              }`}
              onClick={() => setSelectedPost(p as Post)}
            >
              <div className="flex items-start gap-4">
                {/* Vote column */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleVote(p.id, "up")}
                    className="p-1.5 rounded-lg hover:bg-green-100 text-muted-foreground hover:text-green-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-foreground">{p.voteCount}</span>
                  <button
                    onClick={() => handleVote(p.id, "down")}
                    className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    {p.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                    {p.isFeatured && <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 fill-current" />}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[p.category] ?? "bg-gray-100 text-gray-700"}`}>
                      {categories.find((c) => c.value === p.category)?.label ?? p.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-1 leading-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{p.authorName || "Anonymous"}</span>
                    <span>·</span>
                    <span>{format(new Date(p.createdAt), "MMM d, yyyy")}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {p.commentCount} comments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No posts yet. Be the first to share a tip!</p>
          {isAuthenticated ? (
            <Button className="bg-primary text-primary-foreground" onClick={() => setPostOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />Share Your First Tip
            </Button>
          ) : (
            <Button variant="outline" onClick={() => (window.location.href = getLoginUrl())}>
              <LogIn className="w-4 h-4 mr-2" />Sign in to post
            </Button>
          )}
        </div>
      )}

      {/* Post detail sheet */}
      <Sheet open={!!selectedPost} onOpenChange={(v) => !v && setSelectedPost(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedPost && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {selectedPost.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500" />}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[selectedPost.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {categories.find((c) => c.value === selectedPost.category)?.label ?? selectedPost.category}
                  </span>
                </div>
                <SheetTitle className="text-xl font-extrabold leading-tight">{selectedPost.title}</SheetTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{selectedPost.authorName || "Anonymous"}</span>
                  <span>·</span>
                  <span>{format(new Date(selectedPost.createdAt), "MMM d, yyyy")}</span>
                  {user?.id === selectedPost.userId && (
                    <>
                      <span>·</span>
                      <button
                        className="text-destructive hover:text-destructive/80 transition-colors"
                        onClick={() => deletePost.mutate({ id: selectedPost.id })}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </SheetHeader>

              {/* Content */}
              <div className="mb-6">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              {/* Votes */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <button
                  onClick={() => handleVote(selectedPost.id, "up")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-green-100 text-muted-foreground hover:text-green-600 transition-colors text-sm font-medium"
                >
                  <ThumbsUp className="w-4 h-4" />Helpful
                </button>
                <span className="text-sm font-bold text-foreground">{selectedPost.voteCount} votes</span>
                <button
                  onClick={() => handleVote(selectedPost.id, "down")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors text-sm font-medium"
                >
                  <ThumbsDown className="w-4 h-4" />Not helpful
                </button>
              </div>

              {/* Comments */}
              <div>
                <h4 className="font-bold text-foreground mb-4">
                  Comments ({comments?.length ?? 0})
                </h4>

                {comments && comments.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {comments.map((c) => (
                      <div key={c.id} className="bg-muted rounded-xl p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-foreground">{c.authorName || "Anonymous"}</span>
                              <span className="text-xs text-muted-foreground">{format(new Date(c.createdAt), "MMM d")}</span>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{c.content}</p>
                          </div>
                          {user?.id === c.userId && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive flex-shrink-0" onClick={() => deleteComment.mutate({ id: c.id })}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">No comments yet. Be the first!</p>
                )}

                {isAuthenticated ? (
                  <div className="flex gap-2">
                    <Input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleComment(); } }}
                    />
                    <Button
                      size="icon"
                      className="bg-primary text-primary-foreground flex-shrink-0"
                      onClick={handleComment}
                      disabled={!comment.trim() || createComment.isPending}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => (window.location.href = getLoginUrl())}>
                    <LogIn className="w-4 h-4 mr-2" />Sign in to comment
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* New post dialog */}
      <Dialog open={postOpen} onOpenChange={setPostOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Share a Tip or Success Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Category</Label>
              <Select value={postForm.category} onValueChange={(v) => setPostForm({ ...postForm, category: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c.value !== "all").map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Title *</Label>
              <Input
                value={postForm.title}
                onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                placeholder="e.g., How I got 5 leads from one real estate office visit"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Content *</Label>
              <Textarea
                value={postForm.content}
                onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                placeholder="Share your experience, what worked, what didn't, and any tips for others..."
                className="mt-1 resize-none"
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPostOpen(false)}>Cancel</Button>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => {
                if (!postForm.title.trim() || !postForm.content.trim()) { toast.error("Title and content required"); return; }
                createPost.mutate({
                  title: postForm.title,
                  content: postForm.content,
                  category: postForm.category as Parameters<typeof createPost.mutate>[0]["category"],
                });
              }}
              disabled={createPost.isPending}
            >
              Share Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
