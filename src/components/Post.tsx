import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, InvalidEvent, useState } from 'react'

type Type = 'paragraph'|'link';

interface Content {
    type: Type;
    content: string;
}

interface PostProps {
    author: {
        name: string;
        avatarUrl: string;
        role: string;
    };
    publisheAt: Date;
    content: Content[];   
}

export function Post({author, publisheAt, content}: PostProps) {

    const [coments, setComents] = useState([
        'Post muito bacana, hein?!'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateAndFormatted = format(publisheAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale:ptBR,
    } )

    const publishedDateRelativeToNow = formatDistanceToNow(publisheAt, {
        locale: ptBR,
        addSuffix:true,
    })
    
    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        setComents([...coments, newCommentText])
        setNewCommentText('')
    }

    function handleInvalidComment(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete:string) {
        const commentsWithoutDeleteOne = coments.filter(comment => {
            return comment !== commentToDelete
        })
        setComents(commentsWithoutDeleteOne)
    }

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateAndFormatted} dateTime={publisheAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    } else if(line.type === 'link'){
                        <p key={line.content}><a href="">{line.content}</a></p>
                    }
                })}
            </div>
            <form onSubmit={(e) => handleCreateNewComment(e)} className={styles.commentForm}>
                
                <strong>Deixe seu feedback</strong>
                <textarea
                    required
                    value={newCommentText}
                    name='comment'
                    onChange={(e) => {
                        e.target.setCustomValidity('')
                        setNewCommentText(e.target.value)
                    }}
                    placeholder='Deixe seu comentário'
                    onInvalid={handleInvalidComment}
                />
                <footer>
                    <button disabled={newCommentText === ''} type='submit'>Publicar</button>
                
                </footer>
            </form>
            <div className={styles.commentList}>
                {coments.map((comment) => (
                    <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
                ))}
            </div>
        </article>  
    )
}