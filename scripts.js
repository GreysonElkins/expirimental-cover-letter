const boringVersion = document.querySelector('.boring-version')
const portal = document.querySelector('.image-portal')
const recommendations = document.querySelector('.recommendations')
let myNewFriend = ''

boringVersion.innerHTML=`
  To Whom It May Concern:
    <br />
    I am writing to apply as an Engineer in Experimental Storytelling at The Atlantic. This is my Experimental Cover Letter.
    We'll begin with a boring example.
    <br />
    I have been studying JavaScript, HTML, and CSS as a storyteller. You'll find one of my recent projects, Exquisite
    Corpse, was built around this concept. It's an app where users can log-in and partake in playing a creative writing
    game: based on the 1920s tradition of blind collaboration, users are given a prompt and can start a story from scratch
    or start writing on another's story but can't see anything but their own contribution until the entire story is
    published. Designing this product was super exciting because our team had to explore technologies new to us (API design,
    Express.js, knex, and PostgresQL).`

window.setTimeout(() => {
  for(let i = 1; i < 11; i++) {
    window.setTimeout(() => {
      boringVersion.style.opacity= 1 - i / 10
      portal.style.opacity= i / 10

      if (i === 10) typeOut(introduction, "getName")
    }, 10 * i)
}
}, 100)

const introduction = [{
    words: "Just kidding, we can't have boring cover letters for a job in experimental storytelling... can we?"
  }, {
    words: "Hi! I'm Greyson. As you can probably already tell, I'm really excited about The Atlantic's engineering position... I know... I'm being extra"
  }, {
    words: "But anyway, what's your name?"
  }
]

const speechBubble = document.querySelector('.the-narrator')

function typeOut(paragraph, then, character = 0, sentencePosition = 0, where = speechBubble) {

  const finished = paragraph.length - 1
  const sentence = paragraph[sentencePosition].words
  const action = paragraph[sentencePosition]?.action
  const characterLimit = sentence.length
  setTimeout(() => {
    where.insertAdjacentText('beforeEnd', sentence[character])
    character += 1
    
    if (character !== characterLimit) {
      typeOut(paragraph, then, character, sentencePosition)
    } else if (character === characterLimit 
      && sentencePosition !== finished) {
        setTimeout(() => {
          if (action) console.log(action)
          where.innerText = ''
          arbitraryAction(action)
          typeOut(paragraph, then, 0, sentencePosition + 1)
        }, 130)
      } else if (character === characterLimit 
        && sentencePosition === finished
        && then) {
          arbitraryAction(action)
          whatNext(then)
    }
    
  }, 5)
}

function whatNext(then) {
  switch (then) {
      case 'getName':
        getInput('saveName');
      break
      case 'saveName':
        finishGreeting()
      break
        // NEXT STEP!
  }
}

function arbitraryAction(action) {
  switch (action) {
    case 'dropBook':
      console.log('drop!')
      recommendations.insertAdjacentHTML("afterbegin", `
        <a href="http://www.lesfigues.com/book/the-evolutionary-revolution/" target="_blank">
        <img 
          src="https://lh3.googleusercontent.com/p5xTKE87yjespNMRpBXzVC3gN4OAVojG6z94ikwNXbgdbrWnek7R8Pu78Y-lKKbBzDNyJG81F5tgEP8RdLq7BtV34TEnqKV2E3zXxX-ue1uuh1cGbr3D3ch0r2g3idUemDopqMGSBijEe7P6LHeO7iatNoWPBKWluOBOIfOzl1kPgl9lbznR4ZunFXPfRNhp-xlId8L3rFi0YIyn3RDAEoIcdqv7Fl5fPH5CjS4qKAb__bdR72t9UFBQVWODsw3G2xk4SYrPqBm8GZn4v6OZneKN0ulw-tgluoQSlteSbj0t46ilVtOZ0-noNm0F8zglwX5v_6ArqTtoHSVMuBX7AWTnk43Qpk_gM0EnXJcp2SFkoWICQtIuRnkoC8Nt1kkIoONtg35GQljlMvVoCbUrZ67t-jcHf8-Jndnz0RRL_84jqIBzy0EH322_46mtryxmDJC93rQHteKmFkg2wGQEku710ePuKhNXKJgTklb9kXgHh3Yc_6zzjEtg1ikCPgR3z94M0iWBR6br5zBxce9vgBU1j5zxhtZoCnx_pzuro4wAKBgFKl7z_2NZE28XFcboN-UqItH7aU7ukvnSOUZn0Dc1N5EwtLCCk-9lj5XFDFtO243N9VIaL0CmuK-22CbHmM4Pf8dRnMBj9xIAQc6j-_DS_vOTNfZGFJM3kDUK6t1vxSTeijaneMaZmIci=w404-h40-no?authuser=0" 
          alt="A book recommendation"
          title="That book I mentioned"
          style="width: 10em"
        />
        </a>
      `)
  }
}

function getInput(then) {
  document.getElementById('inputs').innerHTML = `
    <form>
      <input placeholder="Your name"/>
      <button 
        id="${then}" 
        class="cta" 
        title="Don't worry, none of this is saved and I'm not really here!"
        type="submit">
          submit
        </button>
    </form>
  `

  const newButton = document.getElementById(`${then}`)

  newButton.addEventListener('click', saveInput.bind(this))
}

function saveInput(event) {
  event.preventDefault()
  whatNext(event.target.id)
}

function finishGreeting() {
  const name = document.querySelector('input').value 
  myNewFriend = name ? name : 'Sylph'
  let inClosing = []

  if (name) {
    inClosing = [{words: `It's nice to meet you ${myNewFriend}! Thanks for your time today.`}]
  } else {
    inClosing = [{
      words: `Not telling me is okay too!`
    }, {
      words: `I'll just call you ${myNewFriend}! (after a character from the most experimental book I've ever read)`,
      action: 'dropBook'
    }]
  }
  document.getElementById('inputs').innerHTML = ''
  speechBubble.innerText = ''
  typeOut(inClosing, () => {})
}