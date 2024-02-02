import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './EidC.css'

export default function Titled() {
  const [items, setItems] = useState([])
  const headingRef = useRef(null)
  const descRef = useRef(null)
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/get-all')
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.log(error));

    setItems(document.querySelectorAll('.item'))
  }, [])

  const expand = (item, i) => {
    items.forEach((it, ind) => {
      if (i === ind) return
      it.clicked = false
    })

    gsap.to(items, {
      width: item.clicked ? '15vw' : '8vw',
      duration: 1.75,

      ease: 'elastic(1, .6)',
      onComplete: () => {
        headingRef.current.textContent = item.clicked ? item.getAttribute('data-title') : ''
        descRef.current.textContent = item.clicked ? item.getAttribute('data-detail') : ''
      }
    })

    item.clicked = !item.clicked
    gsap.to(item, {
      width: item.clicked ? '35vw' : '10vw',
      duration: 2.5,
      ease: 'elastic(1, .3)',

    })
  }

  useEffect(() => {
    items.forEach((item, i) => {
      item.clicked = false
      item.addEventListener('click', () => expand(item, i))
    })
  }, [items])

  return (
    <div className='Titled'>
      <div className="group">
        <div className='detailedd'>
          <h1 ref={headingRef} className="item-heading"></h1>
          <p ref={descRef} className="item-para"></p>
        </div>

        <div
          className="item"
          data-title={blogs[0]?.title}
          data-detail={blogs[0]?.snippet}

          style={{
            backgroundImage: `url(${blogs[0]?.picture})`
          }}
        ></div>

        <div
          className="item"
          data-title={blogs[1]?.title}
          data-detail={blogs[1]?.snippet}

          style={{
            backgroundImage: `url(${blogs[1]?.picture})`
          }}
        ></div>

        <div
          className="item"
          data-title={blogs[2]?.title}
          data-detail={blogs[2]?.snippet}

          style={{
            backgroundImage: `url(${blogs[2]?.picture})`
          }}
        ></div>

        <div
          className="item"
          data-title={blogs[3]?.title}
          data-detail={blogs[3]?.snippet}

          style={{
            backgroundImage: `url(${blogs[3]?.picture})`
          }}
        ></div>

        <div
          className="item"
          data-title={blogs[4]?.title}
          data-detail={blogs[4]?.snippet}

          style={{
            backgroundImage: `url(${blogs[4]?.picture})`
          }}
        ></div>

        <div
          className="item"
          data-title={blogs[5]?.title}
          data-detail={blogs[5]?.snippet}

          style={{
            backgroundImage: `url(${blogs[5]?.picture})`
          }}
        ></div>
      </div>
    </div>
  )
}