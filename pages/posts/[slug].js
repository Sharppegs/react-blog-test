import styles from '../../styles/Slug.module.css'
import {GraphQLClient, gql} from 'graphql-request'


const graphcms = new GraphQLClient('https://api-eu-west-2.hygraph.com/v2/cleo2hy1i0r9201t8h227fuyw/master')

const QUERY = gql`
    query Post($slug: String!) {
        post(where: {slug: $slug}) {
            id,
            title,
            slug,
            date,
            author{
                name,
                avatar{
                    url
                }
            }
            content{
                html
            }
            coverPhoto {
                id
                url
            }
        }
    }
`;

const SLUGLIST = gql`
    {
        posts {
            slug
        }
    }
`

export async function getStaticPaths() {
    const {posts} = await graphcms.request(SLUGLIST)
    return{
        paths: posts.map((post) => ({ params: {slug: post.slug} })),
        fallback: false,
    }
}

// fetches the data array and requests an update every 10 seconds
export async function getStaticProps({params}) {
  const slug = params.slug
  const data = await graphcms.request(QUERY, {slug})
  const post = data.post
  return {
    props: {
      post,
    },
    revalidate: 10,
  }
}




export default function BlogPost({post}) {
    return(
        <main className={styles.blog}>
            <img className={styles.cover} src={post.coverPhoto.url} alt={post.title} />
            <div className={styles.title}>
                
                <div className={styles.authtext}>
                    <h6> By {post.author.name}</h6>
                    <h6 className={styles.date}>{post.date}</h6>
                </div>
            </div>

            <h2>{post.title}</h2>
            
            <div 
                className={styles.content}
                dangerouslySetInnerHTML={{__html: post.content.html}}  
            ></div>

        </main>
    )
}