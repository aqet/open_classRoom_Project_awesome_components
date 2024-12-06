import { Comment } from "../../core/models/comment.models";

export class Post {
    id!: number;
    userId!: number;
    title!: string;
    createdDate!: string;
    content!: string;
    imageUrl!: string;
    comments!: Comment[];
}