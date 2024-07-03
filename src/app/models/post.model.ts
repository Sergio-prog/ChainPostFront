export interface Post {
  _id: string;
  message_id: string;
  content: string;
  chat_id: string;
  author_id: string;
  author_username: string;
  media_link: string;
  views_count: number;
  likes_count: number;
}
