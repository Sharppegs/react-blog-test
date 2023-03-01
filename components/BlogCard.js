import Link from 'next/link'
import styles from "../styles/BlogCard.module.css";


export default function BlogPost({title, author, image, date, slug, content}) {
    
    let localDate = new Date(date).toDateString()
    return(
        <div className={styles.card}>
            <Link href={'/posts/' + slug}>
                <div className={styles.imgContainer}>
                    <img src={image.url} alt={title} />
                    
                </div>
            </Link>

            <div className={styles.text}>
                <h2>{title}</h2>
                <h5>{localDate}</h5>
                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} />
                        <p>Written by:{author.name}</p>
                        
                    </div>

                </div>

            </div>

        </div>
    )
}