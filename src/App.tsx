import { Header } from './components/Header'
import { Content, Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import './global.css'

import styles from './App.module.css'

interface Posts {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
    role: string;
  };
  publisheAt: Date;
  content: Content[];
}

const posts:Posts[] = [
  {
    id:1,
    author: {
      avatarUrl: 'http://github.com/brunopp00.png',
      name:'Bruno Frohlich',
      role: 'Estagiario Unimed'
    },
    content: [
        {type: 'paragraph', content: 'Fala galeraa 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content: 'jane.design/doctorcare'},
        {type: 'link', content:'#novoprojeto'},
        {type: 'link', content:'#nlw'},
        {type: 'link', content:'#rocketseat'}
    ],
    publisheAt: new Date('2023-01-13 20:00:00')
  },
  {
    id:2,
    author: {
      avatarUrl: 'http://github.com/diego3g.png',
      name:'Diego Fernandes',
      role: 'Professor Rocketseat'
    },
    content: [
        {type: 'paragraph', content: 'Fala galeraa 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content: 'jane.design/doctorcare'},
        {type: 'link', content:'#novoprojeto'},
        {type: 'link', content:'#nlw'},
        {type: 'link', content:'#rocketseat'}
    ],
    publisheAt: new Date('2023-01-15 20:00:00')
  }
]

export function App() {
  return (
    <div>
      <Header/>
      
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => (
            <>
              {console.log(post)}
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publisheAt={post.publisheAt}
              />
            </>
          ))}
        </main>
      </div> 
    </div>
  )
}