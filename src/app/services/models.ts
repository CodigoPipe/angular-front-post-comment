
//estos dos sirven para recibir un post

export type Post = {
    aggregateId: string,
    author: string,
    title: string,
    comments: CommentType[]
}

export type CommentType = {
    id: string,
    postId: string,
    author: string,
    content: string,
}

export type CreatePostCommand = {
    postId: string,
    author: string,
    title: string
}

export type CreateCommentCommand = {
    postId: string | undefined,
    commentId: string,
    author: string,
    content: string
}

