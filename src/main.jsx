import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {supabase} from './supabase';
import './style.css';
const statuses=['Want to Read','Reading','Finished'];
const featuredBooks=[
 {key:'OL17930368M',title:'Atomic Habits',author:'James Clear',cover: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',isbn:'9780735211292'},
 {key:'OL39936514M',title:'Fourth Wing',author:'Rebecca Yarros',cover:'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',isbn:'9781649374042'},
 {key:'OL47883047M',title:'The Housemaid',author:'Freida McFadden',cover:'https://covers.openlibrary.org/b/isbn/9781538742570-L.jpg',isbn:'9781538742570'},
 {key:'OL26423400M',title:'The Silent Patient',author:'Alex Michaelides',cover:'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg',isbn:'9781250301697'},
 {key:'OL27448M',title:'Project Hail Mary',author:'Andy Weir',cover:'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg',isbn:'9780593135204'},
 {key:'OL82563M',title:'The Night Circus',author:'Erin Morgenstern',cover:'https://covers.openlibrary.org/b/isbn/9780385534635-L.jpg',isbn:'9780385534635'}
];
const wordBank=[{"word": "Serendipity", "definition": "An unexpected fortunate discovery.", "example": "The word serendipity caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Petrichor", "definition": "The earthy scent after rain.", "example": "The word petrichor caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Limerence", "definition": "Intense romantic infatuation.", "example": "The word limerence caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Resilience", "definition": "The ability to recover from setbacks.", "example": "The word resilience caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Eloquent", "definition": "Fluent and persuasive in expression.", "example": "The word eloquent caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Ephemeral", "definition": "Lasting for a very short time.", "example": "The word ephemeral caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Ineffable", "definition": "Too great to express in words.", "example": "The word ineffable caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Solace", "definition": "Comfort in a time of sadness.", "example": "The word solace caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Mellifluous", "definition": "Sweet and pleasant to hear.", "example": "The word mellifluous caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Tenacious", "definition": "Persistent and determined.", "example": "The word tenacious caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Sonder", "definition": "The realization that others have complex lives.", "example": "The word sonder caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Halcyon", "definition": "Calm, peaceful, and happy.", "example": "The word halcyon caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Luminous", "definition": "Giving off or reflecting light.", "example": "The word luminous caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Reverie", "definition": "A pleasant daydream.", "example": "The word reverie caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Fortitude", "definition": "Courage during hardship.", "example": "The word fortitude caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Quintessential", "definition": "The most typical or perfect example.", "example": "The word quintessential caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Labyrinthine", "definition": "Complicated and maze-like.", "example": "The word labyrinthine caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Lucid", "definition": "Clear and easy to understand.", "example": "The word lucid caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Wistful", "definition": "Longing with gentle sadness.", "example": "The word wistful caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Eudaimonia", "definition": "A state of human flourishing.", "example": "The word eudaimonia caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Verdant", "definition": "Green with lush vegetation.", "example": "The word verdant caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Resplendent", "definition": "Shining brilliantly.", "example": "The word resplendent caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Sanguine", "definition": "Optimistic, especially in difficulty.", "example": "The word sanguine caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Equanimity", "definition": "Calmness under pressure.", "example": "The word equanimity caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Sagacious", "definition": "Wise and perceptive.", "example": "The word sagacious caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Aplomb", "definition": "Confidence and composure.", "example": "The word aplomb caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Perspicacious", "definition": "Quick to understand things.", "example": "The word perspicacious caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Ubiquitous", "definition": "Present or found everywhere.", "example": "The word ubiquitous caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Cacophony", "definition": "A harsh mixture of sounds.", "example": "The word cacophony caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Alacrity", "definition": "Cheerful willingness and promptness.", "example": "The word alacrity caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Impetuous", "definition": "Acting quickly without thought.", "example": "The word impetuous caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Capricious", "definition": "Given to sudden changes of mood.", "example": "The word capricious caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Ethereal", "definition": "Extremely delicate and otherworldly.", "example": "The word ethereal caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Munificent", "definition": "Very generous.", "example": "The word munificent caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Inexorable", "definition": "Impossible to stop or prevent.", "example": "The word inexorable caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Confluence", "definition": "A coming together of people or things.", "example": "The word confluence caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Enigma", "definition": "Something mysterious or difficult to explain.", "example": "The word enigma caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Panacea", "definition": "A supposed solution to every problem.", "example": "The word panacea caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Redolent", "definition": "Strongly suggestive or fragrant.", "example": "The word redolent caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}, {"word": "Meticulous", "definition": "Showing great attention to detail.", "example": "The word meticulous caught her attention while reading.", "fact": "Explore this word in a dictionary to learn more about its origins."}];
function localDayNumber(date=new Date()){return Math.floor(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000)}
function dailyWord(day=localDayNumber()){const index=((day*17+7)%wordBank.length+wordBank.length)%wordBank.length;return wordBank[index]}
const normalizeTitle=s=>(s||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const junkTitle=/\b(summary|study guide|analysis|workbook|review|companion|discussion questions|notes on|guide to|lesson plans|key takeaways|book club questions|unofficial|sparknotes)\b/i;
function rankBooks(docs,term){
 const q=normalizeTitle(term),tokens=q.split(' ').filter(Boolean);
 const ranked=docs.filter(b=>b.key&&b.title).map(b=>{
  const t=normalizeTitle(b.title),authors=(b.author_name||[]).join(' ').toLowerCase();
  const exact=t===q,starts=t.startsWith(q+' '),contains=t.includes(q);
  const overlap=tokens.filter(w=>t.split(' ').includes(w)).length/Math.max(tokens.length,1);
  const authorMatch=authors.includes(q);
  const junk=junkTitle.test(b.title);
  const score=(exact?130:0)+(starts?65:0)+(contains?40:0)+overlap*65+(authorMatch?95:0)+(b.cover_i?10:0)+(b.first_publish_year?5:0)-(junk?200:0)-(authors?0:18);
  return {...b,score,junk,overlap,exact,authorMatch};
 }).filter(b=>!b.junk&&(b.exact||b.authorMatch||b.overlap>=0.6));
 ranked.sort((a,b)=>b.score-a.score);
 const seen=new Set();return ranked.filter(b=>{const key=normalizeTitle(b.title)+'|'+normalizeTitle((b.author_name||[])[0]||'');if(seen.has(key))return false;seen.add(key);return true}).slice(0,10);
}
function ArrowIcon({direction}){return <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d={direction==='left'?'M15 18l-6-6 6-6':'M9 18l6-6-6-6'}/></svg>}
function App(){
 const [mobileNavOpen,setMobileNavOpen]=useState(false);
 const [session,setSession]=useState(null),[username,setUsername]=useState(''),[optionalEmail,setOptionalEmail]=useState(''),[password,setPassword]=useState(''),[authMode,setAuthMode]=useState('signin'),[message,setMessage]=useState(''),[tab,setTab]=useState('Home');
 const [profile,setProfile]=useState(null),[books,setBooks]=useState([]),[words,setWords]=useState([]),[friends,setFriends]=useState([]),[requests,setRequests]=useState([]),[results,setResults]=useState([]),[query,setQuery]=useState(''),[busy,setBusy]=useState(false),[wordInput,setWordInput]=useState({word:'',definition:'',example:''}),[wordBusy,setWordBusy]=useState(false),[wordPreview,setWordPreview]=useState(null),[friendQuery,setFriendQuery]=useState(''),[friendResult,setFriendResult]=useState(null),[selectedFriend,setSelectedFriend]=useState(null),[friendBooks,setFriendBooks]=useState([]);
 const bookSearchVersion=useRef(0);
 const friendSearchVersion=useRef(0);
 const [bookDetail,setBookDetail]=useState(null),[bookDetailBusy,setBookDetailBusy]=useState(false),[completionEditor,setCompletionEditor]=useState(null),[completionMode,setCompletionMode]=useState('year'),[completionValue,setCompletionValue]=useState('');
 const [managedBook,setManagedBook]=useState(null);
 const [recommendations,setRecommendations]=useState([]),[recoBusy,setRecoBusy]=useState(false),[recoError,setRecoError]=useState('');
 const [recoIndex,setRecoIndex]=useState(0);
 const [recoTick,setRecoTick]=useState(0);
 const [bookSuggestions,setBookSuggestions]=useState([]),[wordSuggestions,setWordSuggestions]=useState([]),[bookSuggestOpen,setBookSuggestOpen]=useState(false),[wordSuggestOpen,setWordSuggestOpen]=useState(false);
 const shelfRefs=useRef({});
 const [featuredIndex,setFeaturedIndex]=useState(0),[featuredDetail,setFeaturedDetail]=useState(null),[featuredBusy,setFeaturedBusy]=useState(false),[editProfile,setEditProfile]=useState(false);
 const featuredPaused=useRef(false);
 const [wordDay,setWordDay]=useState(()=>localDayNumber());
 const [speakingWord,setSpeakingWord]=useState('');
 const audioRef=useRef(null);
 const speechRequest=useRef(0);
 const todayWord=dailyWord(wordDay);
 useEffect(()=>{
  const check=()=>setWordDay(localDayNumber());
  const interval=setInterval(check,15000);
  document.addEventListener('visibilitychange',check);
  window.addEventListener('focus',check);
  return()=>{clearInterval(interval);document.removeEventListener('visibilitychange',check);window.removeEventListener('focus',check)};
 },[]);
 useEffect(()=>()=>{speechRequest.current++;audioRef.current?.pause();window.speechSynthesis?.cancel()},[]);
 async function pronounceWord(rawWord){
  const word=String(rawWord||'').trim();if(!word)return;
  const request=++speechRequest.current;
  audioRef.current?.pause();audioRef.current=null;
  window.speechSynthesis?.cancel();setSpeakingWord(word.toLowerCase());
  const fallback=()=>{
   if(request!==speechRequest.current)return;
   if(!('speechSynthesis' in window)){setMessage('Audio pronunciation is not supported on this device.');setSpeakingWord('');return}
   const utterance=new SpeechSynthesisUtterance(word);
   utterance.lang='en-US';utterance.rate=.85;
   utterance.onend=()=>{if(request===speechRequest.current)setSpeakingWord('')};
   utterance.onerror=()=>{if(request===speechRequest.current)setSpeakingWord('')};
   window.speechSynthesis.speak(utterance);
  };
  try{
   const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
   if(!response.ok)throw Error('No recording');
   const entries=await response.json();
   const phonetics=entries.flatMap(e=>e.phonetics||[]);
   const url=phonetics.find(p=>p.audio?.startsWith('https://'))?.audio || phonetics.find(p=>p.audio)?.audio;
   if(request!==speechRequest.current)return;
   if(!url){fallback();return}
   const audio=new Audio(url.startsWith('//')?'https:'+url:url);
   audioRef.current=audio;
   audio.onended=()=>{if(request===speechRequest.current)setSpeakingWord('')};
   audio.onerror=()=>{if(request===speechRequest.current)fallback()};
   await audio.play();
  }catch{if(request===speechRequest.current)fallback()}
 }
 const pronounceButton=word=><button type="button" className="pronounce-button" aria-label={`Hear pronunciation of ${word}`} title={`Hear ${word}`} onClick={()=>pronounceWord(word)}>🔊</button>;
 useEffect(()=>{const interval=setInterval(()=>{if(!featuredPaused.current)setFeaturedIndex(i=>(i+1)%featuredBooks.length)},5000);return()=>clearInterval(interval)},[]);
 async function openFeatured(book){setFeaturedDetail({...book,description:'',published:''});setFeaturedBusy(true);try{const r=await fetch(`https://openlibrary.org/isbn/${book.isbn}.json`);if(r.ok){const data=await r.json();const desc=typeof data.description==='string'?data.description:data.description?.value||'';setFeaturedDetail({...book,description:desc,published:data.publish_date||''})}}catch{}finally{setFeaturedBusy(false)}}
 async function saveFeatured(status){if(!featuredDetail)return;await addBook({google_id:'isbn:'+featuredDetail.isbn,title:featuredDetail.title,author:featuredDetail.author,cover_url:featuredDetail.cover},status);setFeaturedDetail(null)}
 useEffect(()=>{
  if(tab!=='Books'){
   bookSearchVersion.current+=1;
   setQuery('');setBookSuggestions([]);setBookSuggestOpen(false);
   setResults([]);
   setBusy(false);
  }
 },[tab]);
 useEffect(()=>{
  if(tab!=='Profile'){
   friendSearchVersion.current+=1;
   setFriendQuery('');
   setFriendResult(null);
  }
 },[tab]);
 const uid=session?.user?.id;
 const preferenceSignature=books.filter(b=>b.status==='Finished'||b.status==='Want to Read').map(b=>`${b.status}:${b.google_id||b.title}:${b.author||''}`).sort().join('|');
 useEffect(()=>{const id=setInterval(()=>setRecoTick(x=>x+1),60000);const onFocus=()=>setRecoTick(x=>x+1);window.addEventListener('focus',onFocus);return()=>{clearInterval(id);window.removeEventListener('focus',onFocus)}},[]);
 useEffect(()=>{
  let cancelled=false;
  const seeds=books.filter(b=>b.status==='Finished'||b.status==='Want to Read');
  if(!uid||!seeds.length){setRecommendations([]);setRecoBusy(false);return}
  const cacheKey=`verlio:recommendations:v3:${uid}`;
  const signature=preferenceSignature;
  const now=Date.now();
  let cache=null;try{cache=JSON.parse(localStorage.getItem(cacheKey)||'null')}catch{}
  if(cache?.signature===signature&&Array.isArray(cache.items)&&cache.items.length&&now-cache.timestamp<12*60*60*1000){setRecommendations(cache.items);setRecoBusy(false);return}
  if(cache?.items?.length)setRecommendations(cache.items);
  async function recommend(){
   setRecoBusy(true);setRecoError('');
   try{
    // Each Finished and Want to Read title has equal weight. Prefer specific Open Library subjects and author similarities.
    const ordered=[...seeds].sort((a,b)=>String(a.google_id||a.title).localeCompare(String(b.google_id||b.title)));
    const offsetSeed=Math.floor(now/(12*60*60*1000))%ordered.length;
    const rotated=ordered.slice(offsetSeed).concat(ordered.slice(0,offsetSeed)).slice(0,12);
    const perSeed=await Promise.all(rotated.map(async book=>{
     const raw=(book.google_id||'').replace(/^openlibrary:/,'');
     let path=raw.startsWith('/works/')?raw:raw.startsWith('OL')?`/works/${raw}`:null;
     let subjects=[];
     if(path){try{const r=await fetch(`https://openlibrary.org${path}.json`);if(r.ok){const data=await r.json();subjects=(data.subjects||[]).filter(x=>typeof x==='string'&&x.length<45&&!/fiction|novel|literature|general|accessible|large print|translations|history and criticism|protected daisy/i.test(x)).slice(0,8)}}catch{}}
     // Some saved editions are ISBNs. Look up the work and its subjects when possible.
     if(!subjects.length&&raw.startsWith('isbn:')){try{const r=await fetch(`https://openlibrary.org/isbn/${raw.slice(5)}.json`);if(r.ok){const d=await r.json();const key=d.works?.[0]?.key;if(key){const wr=await fetch(`https://openlibrary.org${key}.json`);if(wr.ok){const w=await wr.json();subjects=(w.subjects||[]).filter(x=>typeof x==='string'&&x.length<45&&!/fiction|novel|literature|general|accessible|large print/i.test(x)).slice(0,8)}}}}catch{}}
     return {book,subjects};
    }));
    const subjectCounts=new Map();perSeed.forEach(({subjects})=>[...new Set(subjects.map(x=>x.toLowerCase()))].forEach(x=>subjectCounts.set(x,(subjectCounts.get(x)||0)+1)));
    const subjectTerms=[...subjectCounts].sort((a,b)=>b[1]-a[1]).slice(0,7).map(([name])=>name);
    const authors=[...new Set(ordered.map(b=>(b.author||'').split(',')[0].trim()).filter(x=>x&&x!=='Unknown author'))].slice(0,5);
    const searches=[...subjectTerms.map(x=>({subject:x})),...authors.map(x=>({author:x}))].slice(0,12);
    if(!searches.length)searches.push(...ordered.slice(0,4).map(b=>({q:b.title})));
    const lists=await Promise.all(searches.map(async params=>{try{const q=new URLSearchParams({...params,limit:'45',fields:'key,title,author_name,cover_i,first_publish_year,edition_count,subject'});const r=await fetch(`https://openlibrary.org/search.json?${q}`);return r.ok?(await r.json()).docs||[]:[]}catch{return []}}));
    const owned=new Set(books.map(b=>normalizeTitle(b.title)));
    const scored=new Map();
    lists.forEach((docs,idx)=>docs.forEach((b,pos)=>{
     const title=normalizeTitle(b.title);if(!title||owned.has(title)||junkTitle.test(b.title)||!b.cover_i||!b.author_name?.[0]||!b.key?.startsWith('/works/'))return;
     const key=title+'|'+normalizeTitle(b.author_name[0]);
     const matchedSubjects=(b.subject||[]).map(x=>String(x).toLowerCase()).filter(x=>subjectCounts.has(x));
     const subjectScore=matchedSubjects.reduce((sum,x)=>sum+subjectCounts.get(x)*7,0);
     const authorScore=authors.some(x=>normalizeTitle(x)===normalizeTitle(b.author_name[0]))?9:0;
     const score=subjectScore+authorScore+Math.max(0,7-pos*.15)+(b.edition_count||0)/100;
     const candidate={google_id:'openlibrary:'+b.key,work_key:b.key,title:b.title,author:b.author_name[0],cover_url:`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`,published:b.first_publish_year,score};
     if(!scored.has(key)||score>scored.get(key).score)scored.set(key,candidate);
    }));
    const candidates=[...scored.values()].sort((a,b)=>b.score-a.score);
    // Rotate among relevant matches in 12-hour windows, while retaining the strongest matches.
    const bucket=Math.floor(now/(12*60*60*1000));
    const top=candidates.slice(0,45);
    const offset=top.length?bucket%Math.min(top.length,12):0;
    const selected=top.slice(offset).concat(top.slice(0,offset)).slice(0,18);
    if(!cancelled){setRecommendations(selected);setRecoIndex(0);if(selected.length){try{localStorage.setItem(cacheKey,JSON.stringify({timestamp:Date.now(),signature,items:selected}))}catch{}}else setRecoError('No matching recommendations yet. Add more books to your library.')}
   }catch{if(!cancelled)setRecoError('Recommendations are temporarily unavailable.')}finally{if(!cancelled)setRecoBusy(false)}
  }
  recommend();return()=>{cancelled=true};
 },[uid,preferenceSignature,Math.floor(Date.now()/(12*60*60*1000)),recoTick&&Math.floor(Date.now()/(12*60*60*1000))]);
 useEffect(()=>{
  if(tab!=='Books'||query.trim().length<2){setBookSuggestions([]);return}
  const controller=new AbortController();const id=setTimeout(async()=>{try{const params=new URLSearchParams({q:query.trim(),limit:'35',fields:'key,title,author_name,cover_i,first_publish_year'});const r=await fetch(`https://openlibrary.org/search.json?${params}`,{signal:controller.signal});if(!r.ok)return;const data=await r.json();setBookSuggestions(rankBooks(data.docs||[],query.trim()).slice(0,3).map(b=>({google_id:'openlibrary:'+b.key,work_key:b.key,title:b.title,author:(b.author_name||[])[0]||'Unknown author',cover_url:b.cover_i?`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`:'',published:b.first_publish_year}))) }catch{}},300);
  return()=>{clearTimeout(id);controller.abort()};
 },[query,tab]);
 useEffect(()=>{
  const term=wordInput.word.trim();if(tab!=='Words'||term.length<2||!wordSuggestOpen){setWordSuggestions([]);return}
  const controller=new AbortController();const id=setTimeout(async()=>{try{const r=await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(term)}&max=3`,{signal:controller.signal});if(r.ok)setWordSuggestions((await r.json()).slice(0,3).map(x=>x.word))}catch{}},250);
  return()=>{clearTimeout(id);controller.abort()};
 },[wordInput.word,tab,wordSuggestOpen]);
 function moveShelf(id,direction){const el=shelfRefs.current[id];if(el)el.scrollBy({left:direction*Math.max(240,el.clientWidth*.75),behavior:'smooth'})}

 useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>setSession(data.session));const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>setSession(s));return()=>subscription.unsubscribe()},[]);
 useEffect(()=>{if(uid)loadAll();else{setProfile(null);setBooks([]);setWords([]);setFriends([]);setRequests([])}},[uid]);
 async function loadAll(){const [p,b,w,f,r]=await Promise.all([supabase.from('profiles').select('*').eq('id',uid).maybeSingle(),supabase.from('user_books').select('*').eq('user_id',uid).order('created_at',{ascending:false}),supabase.from('saved_words').select('*').eq('user_id',uid).order('created_at',{ascending:false}),supabase.from('friendships').select('*,requester:profiles!friendships_requester_id_fkey(*),addressee:profiles!friendships_addressee_id_fkey(*)').or(`requester_id.eq.${uid},addressee_id.eq.${uid}`),supabase.from('friendships').select('*').eq('addressee_id',uid).eq('status','pending')]);for(const x of [p,b,w,f,r])if(x.error)setMessage(x.error.message);setProfile(p.data);setBooks(b.data||[]);setWords(w.data||[]);setFriends(f.data||[]);setRequests(r.data||[])}
 async function auth(e){
 e.preventDefault();setMessage('');
 const name=username.trim().toLowerCase();
 if(!/^[a-z0-9_]{3,24}$/.test(name)){setMessage('Username must be 3–24 lowercase letters, numbers, or underscores.');return}
 // An internal identifier is used only for Supabase's password provider; it is not a deliverable email.
 const internalEmail=`${name}@accounts.verlio.invalid`;
 const opts={email:internalEmail,password};
 const {error,data}=authMode==='signup'
  ? await supabase.auth.signUp({...opts,options:{data:{verlio_username:name,contact_email:optionalEmail.trim()||null}}})
  : await supabase.auth.signInWithPassword(opts);
 if(error){setMessage(error.message);return}
 if(authMode==='signup'&&!data.session){setMessage('Account created, but email confirmation is enabled. Disable Confirm email under Supabase Authentication → Providers → Email for this username-only prototype.');return}
 if(authMode==='signup')setMessage('Account created. Welcome to Verlio!');
}
 async function saveProfile(patch){const {error}=await supabase.from('profiles').update(patch).eq('id',uid);if(error)setMessage(error.message);else await loadAll()}
 async function searchBooks(e){
  e.preventDefault();
  const term=query.trim();
  if(!term)return;
  const searchVersion=++bookSearchVersion.current;
  setBusy(true);setMessage('');setResults([]);
  try{
   const params=new URLSearchParams({q:term,limit:'100',fields:'key,title,author_name,cover_i,first_publish_year,edition_count'});
   const res=await fetch(`https://openlibrary.org/search.json?${params.toString()}`,{headers:{Accept:'application/json'}});
   if(!res.ok){if(res.status===429)throw new Error('Book search is busy. Please wait a moment and try again.');throw new Error(`Book search failed (HTTP ${res.status}). Please try again.`)}
   const data=await res.json();
   const matches=rankBooks(data.docs||[],term).map(b=>({
    google_id:`openlibrary:${b.key}`,work_key:b.key,
    title:b.title,
    author:(b.author_name||[]).slice(0,3).join(', ')||'Unknown author',
    cover_url:b.cover_i?`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`:'',
    description:b.first_publish_year?`First published ${b.first_publish_year}`:'',
    published:b.first_publish_year||''
   }));
   if(searchVersion!==bookSearchVersion.current)return;
   setResults(matches);
   if(!matches.length)setMessage('No matching books found. Try a different title or author.');
  }catch(err){if(searchVersion!==bookSearchVersion.current)return;setMessage(err instanceof TypeError?'Could not reach Open Library. Check your internet connection and try again.':err.message||'Book search unavailable.');}
  finally{if(searchVersion===bookSearchVersion.current)setBusy(false)}
 }
 async function openBookDetail(book){setBookDetail({...book,summary:''});setBookDetailBusy(true);try{if(book.work_key){const response=await fetch(`https://openlibrary.org${book.work_key}.json`);if(response.ok){const data=await response.json();const summary=typeof data.description==='string'?data.description:data.description?.value||'';setBookDetail(prev=>prev?.google_id===book.google_id?{...prev,summary}:prev)}}}catch{}finally{setBookDetailBusy(false)}}
 function beginCompletion(book){setCompletionEditor(book.id);setCompletionMode(book.finished_date?'date':'year');setCompletionValue(book.finished_date||String(book.finished_year||''))}
 async function saveCompletion(bookId){const year=completionMode==='year'?Number(completionValue):Number(completionValue.slice(0,4));if(!completionValue||!Number.isInteger(year)||year<1000||year>new Date().getFullYear()){setMessage('Enter a valid completion year or date.');return}const patch={finished_year:year,finished_date:completionMode==='date'?completionValue:null};const {error}=await supabase.from('user_books').update(patch).eq('id',bookId).eq('user_id',uid);if(error)setMessage(error.message);else{setCompletionEditor(null);loadAll()}}
 async function addBook(book,status){const {work_key,published,summary,...record}=book;const patch={user_id:uid,...record,status};if(status==='Finished')patch.finished_year=null;const {error}=await supabase.from('user_books').upsert(patch,{onConflict:'user_id,google_id'});setMessage(error?.message||(status==='Finished'?'Book saved. Set its completion year or date in your Finished shelf.':'Book saved'));if(!error){setBookDetail(null);loadAll()}}
 async function changeStatus(id,status){const patch={status};if(status!=='Finished'){patch.finished_year=null;patch.finished_date=null}const {error}=await supabase.from('user_books').update(patch).eq('id',id).eq('user_id',uid);if(error)setMessage(error.message);else loadAll()}
 async function removeBook(id){const {error}=await supabase.from('user_books').delete().eq('id',id).eq('user_id',uid);if(error)setMessage(error.message);else loadAll()}
 async function lookupWord(e){
  e.preventDefault();
  const term=wordInput.word.trim();
  if(!term)return;
  setWordBusy(true);setWordPreview(null);setMessage('');
  try{
   const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`);
   if(!response.ok){if(response.status===404)throw new Error('No dictionary entry found. Check the spelling and try again.');throw new Error('Dictionary unavailable right now. Please try again.');}
   const entries=await response.json();
   const meanings=(Array.isArray(entries)?entries:[]).flatMap(entry=>(entry.meanings||[]).flatMap(m=>(m.definitions||[]).map(d=>({partOfSpeech:m.partOfSpeech,definition:d.definition,example:d.example||''}))));
   if(!meanings.length)throw new Error('No definition found for that word.');
   const best=meanings[0];
   setWordPreview({word:term,definition:best.definition,example:best.example,partOfSpeech:best.partOfSpeech});
  }catch(err){setMessage(err.message||'Unable to look up that word.');}
  finally{setWordBusy(false)}
 }
 async function addWord(){
  if(!wordPreview||wordBusy)return;
  setWordBusy(true);setMessage('');
  const {error}=await supabase.from('saved_words').insert({word:wordPreview.word,definition:wordPreview.definition,example:wordPreview.example||'',user_id:uid});
  if(error)setMessage(error.message);else{setWordInput({word:'',definition:'',example:''});setWordPreview(null);await loadAll()}
  setWordBusy(false);
 }
 async function findFriend(e){e.preventDefault();const searchVersion=++friendSearchVersion.current;const term=friendQuery.trim();if(!term)return;setFriendResult(null);const {data,error}=await supabase.from('profiles').select('id,username,display_name,avatar_url').ilike('username',term).maybeSingle();if(searchVersion!==friendSearchVersion.current)return;setFriendResult(data);setMessage(error?.message||(!data?'No username found':''))}
 async function requestFriend(id){const {error}=await supabase.from('friendships').insert({requester_id:uid,addressee_id:id});setMessage(error?.message||'Friend request sent');loadAll()}
 async function acceptFriend(id){const {error}=await supabase.from('friendships').update({status:'accepted'}).eq('id',id).eq('addressee_id',uid);if(error)setMessage(error.message);else loadAll()}
 async function openFriend(person){setSelectedFriend(person);const {data,error}=await supabase.from('user_books').select('*').eq('user_id',person.id);setFriendBooks(data||[]);if(error)setMessage(error.message)}
 async function uploadAvatar(e){const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')||file.size>2*1024*1024){setMessage('Use an image smaller than 2 MB');return}const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';const path=`${uid}/avatar.${ext}`;const {error}=await supabase.storage.from('avatars').upload(path,file,{upsert:true,contentType:file.type});if(error){setMessage(error.message);return}const {data}=supabase.storage.from('avatars').getPublicUrl(path);saveProfile({avatar_url:data.publicUrl+'?v='+Date.now()})}
 const accepted=friends.filter(f=>f.status==='accepted');const pending=friends.filter(f=>f.status==='pending'&&f.addressee_id===uid);
 const bookList=(list,editable=true,shelfId="shelf")=><div className="digital-shelf"><div className="shelf-nav shelf-nav-left"><button type="button" aria-label="Previous books" onClick={()=>moveShelf(shelfId,-1)}><ArrowIcon direction="left"/></button></div><div className={`shelf-books ${list.length<=2?"shelf-books-centered":""}`} ref={el=>{shelfRefs.current[shelfId]=el}}> {list.length?list.map(b=><button type="button" className="shelf-book" key={b.id} title={`${b.title} — ${b.author}`} aria-label={`View ${b.title}`} onClick={()=>setManagedBook({...b,editable})}>{b.cover_url?<img loading="lazy" src={b.cover_url} alt={`${b.title} cover`}/>:<span className="shelf-placeholder">{b.title}</span>}</button>):<p className="shelf-empty">Your shelf is waiting for its first book.</p>}</div><div className="shelf-nav shelf-nav-right"><button type="button" aria-label="Next books" onClick={()=>moveShelf(shelfId,1)}><ArrowIcon direction="right"/></button></div></div>;

 if(!supabase)return <main className="center"><h1>Verlio</h1><p>Configure your Supabase project in <code>.env</code> to begin.</p></main>;
 if(!session)return <main className="center"><div className="auth"><h1>Verlio<span>◦</span></h1><p>Your words. Your books. Your people.</p><form onSubmit={auth}><input type="text" autoComplete="username" placeholder="Username" required minLength="3" maxLength="24" value={username} onChange={e=>setUsername(e.target.value)}/>{authMode==='signup'&&<input type="email" autoComplete="email" placeholder="Email (optional; recovery not yet supported)" value={optionalEmail} onChange={e=>setOptionalEmail(e.target.value)}/>}<input type="password" autoComplete={authMode==='signup'?'new-password':'current-password'} minLength="6" placeholder="Password" required value={password} onChange={e=>setPassword(e.target.value)}/><button>{authMode==='signup'?'Create account':'Sign in'}</button></form><button className="subtle" onClick={()=>setAuthMode(authMode==='signup'?'signin':'signup')}>{authMode==='signup'?'Already have an account? Sign in':'New here? Create an account'}</button><p className="notice">{message}</p></div></main>;
 return <div className="app-shell"><aside className={`app-sidebar ${mobileNavOpen?'sidebar-open':''}`}><button className="sidebar-brand" onClick={()=>{setTab('Home');setMobileNavOpen(false)}}><span className="brand-mark">V</span> Verlio</button><nav className="sidebar-links">{[['Home','⌂'],['Words','▣'],['Books','▥'],['Friends','♧'],['Profile','♙']].map(([name,icon])=><button key={name} className={(tab===name||(name==='Friends'&&tab==='Profile'&&selectedFriend))?'active':''} onClick={()=>{setTab(name==='Friends'?'Profile':name);setMobileNavOpen(false);if(name==='Friends'){setTimeout(()=>document.querySelector('.friends-panel')?.scrollIntoView({behavior:'smooth'}),100)}else setSelectedFriend(null)}}><span className="nav-symbol">{icon}</span>{name==='Books'?'Library':name}</button>)}</nav><div className="sidebar-bottom">Your words. Your books. Your people.</div></aside>{mobileNavOpen&&<button className="mobile-scrim" aria-label="Close navigation" onClick={()=>setMobileNavOpen(false)}/>}<div className="app-content"><header className="app-topbar"><button className="mobile-menu" onClick={()=>setMobileNavOpen(v=>!v)} aria-label="Open navigation">☰</button><div className="topbar-title"><strong>{tab==='Home'?`Good ${new Date().getHours()<12?'morning':new Date().getHours()<17?'afternoon':'evening'}${profile?.display_name?', '+profile.display_name.split(' ')[0]:''}`:tab==='Books'?'My Library':tab==='Words'?'My Vocabulary':'My Profile'}</strong><span>{tab==='Home'?'A new word, your books, and recommendations—all in one place.':'Your personal reading and vocabulary space.'}</span></div><button className="topbar-avatar" onClick={()=>setTab('Profile')} aria-label="Open profile">{profile?.avatar_url?<img src={profile.avatar_url} alt=""/>:'V'}</button></header><main className="container dashboard-container">{message&&<div className="notice" role="status">{message}<button className="subtle" onClick={()=>setMessage('')}>×</button></div>}
 {tab==='Home'&&<><div className="dashboard-top"><section className="daily-feature"><div className="feature-heading"><span>▦ &nbsp; Word of the Day</span><small>{new Date().toLocaleDateString(undefined,{month:'short',day:'numeric'})}</small></div><div className="daily-word-title"><h1>{todayWord.word}</h1>{pronounceButton(todayWord.word)}</div><p className="daily-definition">{todayWord.definition}</p><blockquote>“{todayWord.example}”</blockquote><button className="daily-save" onClick={()=>{setWordInput({word:todayWord.word,definition:todayWord.definition,example:todayWord.example});setWordPreview({...todayWord,partOfSpeech:''});setTab('Words')}}>♡ Save word</button></section><section className="panel word-add-card home-word-add"><div className="word-add-heading"><span className="word-add-icon">▣</span><div><h2>Add a Word</h2><p className="muted">Look up a word, save it, and build your vocabulary.</p></div></div><form className="search word-search" onSubmit={lookupWord}><div className="search-field-wrap"><input placeholder="Type a word…" autoComplete="off" required value={wordInput.word} onFocus={()=>setWordSuggestOpen(true)} onChange={e=>{setWordInput({...wordInput,word:e.target.value});setWordPreview(null);setWordSuggestOpen(true)}}/>{wordInput.word&&<button type="button" className="input-clear" onClick={()=>{setWordInput({word:'',definition:'',example:''});setWordPreview(null);setWordSuggestions([])}} aria-label="Clear word">×</button>}{wordSuggestOpen&&wordSuggestions.length>0&&<div className="suggestion-menu">{wordSuggestions.slice(0,3).map(w=><button key={w} type="button" onClick={()=>{setWordInput({...wordInput,word:w});setWordSuggestions([]);setWordSuggestOpen(false)}}>{w}</button>)}</div>}</div><button className="search-submit" disabled={wordBusy}>⌕ Find</button></form>{wordPreview&&<div className="word"><h3>{wordPreview.word}</h3><p>{wordPreview.definition}</p>{wordPreview.example&&<blockquote>{wordPreview.example}</blockquote>}<button onClick={addWord}>Save word</button></div>}<p className="muted api-note">Definitions powered by Free Dictionary API.</p></section></div><div className="dashboard-main"><div className="dashboard-left"><section className="panel library-overview"><div className="section-heading"><h2>▣ &nbsp; Your Library</h2><button className="subtle" onClick={()=>setTab('Books')}>View Library →</button></div><div className="library-stats">{[['Reading','Currently Reading','▣'],['Want to Read','Want to Read','♧'],['Finished','Finished','✓']].map(([status,label,icon])=><button key={status} className={'stat-tile stat-'+status.toLowerCase().replaceAll(' ','-')} onClick={()=>setTab('Books')}><span>{icon}</span><div><small>{label}</small><strong>{books.filter(b=>b.status===status).length}</strong></div></button>)}</div></section><section className="panel recommendations-panel"><div className="section-heading"><div><h2>✧ &nbsp; Recommended for You</h2><p className="muted">Based equally on Finished and Want to Read books.</p></div><span className="refresh-pill">↻ Every 12 hours</span></div>{recoBusy?<p className="muted">Finding books for you…</p>:recommendations.length?<div className="recommendation-carousel"><button className="carousel-side-arrow" onClick={()=>moveShelf('recommendations',-1)} aria-label="Previous recommendations"><ArrowIcon direction="left"/></button><div className="recommendation-track" ref={el=>{shelfRefs.current.recommendations=el}}>{recommendations.map(book=><button type="button" key={book.google_id} className="recommendation-cover" onClick={()=>openBookDetail(book)}><img loading="lazy" src={book.cover_url} alt={`${book.title} cover`}/><strong>{book.title}</strong><small>{book.author}</small></button>)}</div><button className="carousel-side-arrow" onClick={()=>moveShelf('recommendations',1)} aria-label="Next recommendations"><ArrowIcon direction="right"/></button></div>:<p className="muted">{recoError||'Add books to Finished or Want to Read for recommendations.'}</p>}</section></div><div className="dashboard-right"><section className="panel reading-now"><h2>▣ &nbsp; Reading Now</h2>{books.filter(b=>b.status==='Reading').length?books.filter(b=>b.status==='Reading').slice(0,2).map(b=><button key={b.id} className="reading-book" onClick={()=>setManagedBook({...b,editable:true})}>{b.cover_url&&<img src={b.cover_url} alt=""/>}<span><strong>{b.title}</strong><small>{b.author}</small><em>View book →</em></span></button>):<p className="muted">Your current reads will appear here.</p>}</section><section className="panel yearly-books"><h2>▥ &nbsp; This Year in Books</h2><div className="year-stat"><strong>{books.filter(b=>b.status==='Finished'&&String(b.completed_at||b.finished_at||b.completion_date||'').startsWith(String(new Date().getFullYear()))).length}</strong><span>Books finished this year</span></div><p className="muted">Track your reading journey in My Library.</p><button className="subtle" onClick={()=>setTab('Books')}>Explore my books →</button></section></div></div></>}
 {tab==='Books'&&<><h1>My Library</h1><form className="search" onSubmit={searchBooks}><div className="search-field-wrap"><input aria-label="Search books by title or author" autoComplete="off" placeholder="Search books by title or author" value={query} onFocus={()=>setBookSuggestOpen(true)} onChange={e=>{setQuery(e.target.value);setBookSuggestOpen(true)}} required/>{query&&<button type="button" className="input-clear" aria-label="Clear book search" onClick={()=>{setQuery('');setResults([]);setBookSuggestions([]);setBookSuggestOpen(false)}}>×</button>}{bookSuggestOpen&&bookSuggestions.length>0&&<div className="suggestion-menu" role="listbox">{bookSuggestions.map(b=><button type="button" role="option" aria-selected="false" key={b.google_id} onClick={()=>{setBookSuggestOpen(false);setQuery(b.title);setBookSuggestions([]);openBookDetail(b)}}><strong>{b.title}</strong><small>{b.author}</small></button>)}</div>}</div><button className="search-submit" disabled={busy}>{busy?'Searching…':'Search books'}</button></form>{results.length>0&&<section className="panel"><h2>Search results</h2><div className="bookgrid">{results.map(b=><article className="book" key={b.google_id}><button type="button" className="book-result-open" onClick={()=>openBookDetail(b)}><div className="bookhead">{b.cover_url&&<img src={b.cover_url} alt="Cover"/>}<div><strong>{b.title}</strong><p>{b.author}</p><small>View details</small></div></div></button><div className="actions">{statuses.map(s=><button className="small" onClick={()=>addBook(b,s)} key={s}>{s}</button>)}</div></article>)}</div></section>}{bookDetail&&<div className="book-modal-backdrop" onClick={()=>setBookDetail(null)}><section className="book-modal" role="dialog" aria-modal="true" aria-label="Book details" onClick={e=>e.stopPropagation()}><button className="modal-close subtle" onClick={()=>setBookDetail(null)} aria-label="Close">×</button><div className="modal-book-info">{bookDetail.cover_url&&<img src={bookDetail.cover_url} alt="Book cover"/>}<div><h2>{bookDetail.title}</h2><p>by {bookDetail.author}</p>{bookDetail.published&&<p className="muted">First published {bookDetail.published}</p>}<p>{bookDetailBusy?'Loading description…':bookDetail.summary||'No description available.'}</p></div></div><div className="actions">{statuses.map(s=><button key={s} onClick={()=>addBook(bookDetail,s)}>{s}</button>)}</div></section></div>}{statuses.map(s=><details className="panel shelf-panel" key={s} open><summary className="shelf-summary"><span className="shelf-summary-icon" aria-hidden="true">{s==='Finished'?'✓':s==='Reading'?'▤':'♧'}</span><span className="shelf-summary-label"><strong>{s==='Reading'?'Currently Reading':s}</strong><small>{books.filter(b=>b.status===s).length} books</small></span><span className="shelf-chevron" aria-hidden="true">⌄</span></summary><div className="shelf-content">{bookList(books.filter(b=>b.status===s),true,'library-'+s)}</div></details>)}</>}
 {tab==='Words'&&<><h1>My Vocabulary</h1><section className="panel"><p className="eyebrow">WORD OF THE DAY</p><div className="word-pronunciation-heading"><h2>{todayWord.word}</h2>{pronounceButton(todayWord.word)}</div><p>{todayWord.definition}</p><blockquote>“{todayWord.example}”</blockquote><small>{todayWord.fact}</small><p><button disabled={wordBusy||words.some(w=>w.word.toLowerCase()===todayWord.word.toLowerCase())} onClick={async()=>{setWordBusy(true);setMessage('');const w=todayWord;const {error}=await supabase.from('saved_words').insert({word:w.word,definition:w.definition,example:w.example,user_id:uid});if(error)setMessage(error.message);else await loadAll();setWordBusy(false)}}>{words.some(w=>w.word.toLowerCase()===todayWord.word.toLowerCase())?'Already saved':'Save this word'}</button></p></section><section className="panel word-add-card"><div className="word-add-heading"><span className="word-add-icon">Aa</span><div><h2>Add a Word</h2><p className="muted">Discover its meaning and grow your vocabulary.</p></div></div><form className="search word-search" onSubmit={lookupWord}><div className="search-field-wrap"><input placeholder="Type a word, e.g. serendipity" autoComplete="off" required value={wordInput.word} onFocus={()=>setWordSuggestOpen(true)} onChange={e=>{setWordInput({...wordInput,word:e.target.value});setWordPreview(null);setWordSuggestOpen(true)}}/>{wordInput.word&&<button type="button" className="input-clear" aria-label="Clear word search" onClick={()=>{setWordInput({word:'',definition:'',example:''});setWordPreview(null);setWordSuggestions([]);setWordSuggestOpen(false)}}>×</button>}{wordSuggestOpen&&wordSuggestions.length>0&&<div className="suggestion-menu" role="listbox">{wordSuggestions.map(w=><button type="button" role="option" aria-selected="false" key={w} onClick={()=>{setWordInput({...wordInput,word:w});setWordSuggestOpen(false);setWordSuggestions([]);setWordPreview(null)}}><strong>{w}</strong></button>)}</div>}</div><button className="search-submit" disabled={wordBusy}>{wordBusy?'Looking up…':'Find'}</button></form>{wordPreview&&<div className="word"><div className="word-pronunciation-heading"><h3>{wordPreview.word}</h3>{pronounceButton(wordPreview.word)}</div><p className="muted">{wordPreview.partOfSpeech}</p><p>{wordPreview.definition}</p>{wordPreview.example&&<blockquote>“{wordPreview.example}”</blockquote>}<button disabled={wordBusy} onClick={addWord}>{wordBusy?'Saving…':'Save word to my vocabulary'}</button></div>}<p className="muted">Definitions powered by Free Dictionary API. Suggestions powered by Datamuse.</p></section><section className="panel"><h2>Saved words ({words.length})</h2>{words.map(w=><article className="word" key={w.id}><div className="word-pronunciation-heading"><h3>{w.word}</h3>{pronounceButton(w.word)}</div><p>{w.definition}</p><i>{w.example}</i><p><button className="subtle" onClick={async()=>{await supabase.from('saved_words').delete().eq('id',w.id).eq('user_id',uid);loadAll()}}>Remove</button></p></article>)}</section></>}
 {tab==='Profile'&&<><section className="panel profile-top"><label className="profile-avatar-picker" aria-label="Change profile picture" title="Change profile picture"><img className="avatar" src={profile?.avatar_url||'https://placehold.co/160x160/e7e9ef/27365a?text=V'} alt="Profile"/><span className="avatar-camera">📷</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadAvatar}/></label><div className="profile-identity"><h2>{profile?.display_name||profile?.username||'Reader'}</h2><p className="muted">@{profile?.username||''}</p></div><button className="subtle" onClick={()=>setEditProfile(v=>!v)}>{editProfile?'Close editor':'Edit Profile'}</button>{editProfile&&<div className="profile-edit"><label>Display name<input value={profile?.display_name||''} onChange={e=>setProfile({...profile,display_name:e.target.value})}/></label><button onClick={async()=>{await saveProfile({display_name:profile?.display_name||''});setEditProfile(false)}}>Save changes</button><p className="muted">Your username is your sign-in ID and cannot currently be changed.</p><button className="subtle" onClick={()=>supabase.auth.signOut()}>Sign out</button></div>}</section><div className="profile-book-row"><section className="panel profile-book-card"><h3>Currently Reading</h3>{books.filter(b=>b.status==='Reading').length?books.filter(b=>b.status==='Reading').slice(0,1).map(b=><div key={b.id} className="profile-featured-book">{b.cover_url&&<img src={b.cover_url} alt="Book cover"/>}<strong>{b.title}</strong></div>):<p className="muted">No book selected</p>}<button className="subtle" onClick={()=>setTab('Books')}>My library →</button></section><section className="panel profile-book-card"><h3>Favorite This Year</h3>{books.find(b=>b.id===profile?.top_book_year_id)&&<div className="profile-featured-book">{books.find(b=>b.id===profile?.top_book_year_id)?.cover_url&&<img src={books.find(b=>b.id===profile?.top_book_year_id).cover_url} alt="Book cover"/>}<strong>{books.find(b=>b.id===profile?.top_book_year_id)?.title}</strong></div>}<select aria-label="Choose favorite this year" value={profile?.top_book_year_id||''} onChange={e=>saveProfile({top_book_year_id:e.target.value||null})}><option value="">Choose a book</option>{books.map(b=><option value={b.id} key={b.id}>{b.title}</option>)}</select></section><section className="panel profile-book-card"><h3>All-Time Favorite</h3>{books.find(b=>b.id===profile?.top_book_all_id)&&<div className="profile-featured-book">{books.find(b=>b.id===profile?.top_book_all_id)?.cover_url&&<img src={books.find(b=>b.id===profile?.top_book_all_id).cover_url} alt="Book cover"/>}<strong>{books.find(b=>b.id===profile?.top_book_all_id)?.title}</strong></div>}<select aria-label="Choose all-time favorite" value={profile?.top_book_all_id||''} onChange={e=>saveProfile({top_book_all_id:e.target.value||null})}><option value="">Choose a book</option>{books.map(b=><option value={b.id} key={b.id}>{b.title}</option>)}</select></section></div><section className="panel friends-panel"><h2>Friends ({accepted.length})</h2><h3>Find by username</h3><form className="search" onSubmit={findFriend}><input value={friendQuery} onChange={e=>setFriendQuery(e.target.value)} placeholder="Search username" required/><button>Find friend</button></form>{friendResult&&<p>{friendResult.display_name||friendResult.username} (@{friendResult.username}) {friendResult.id!==uid&&<button onClick={()=>requestFriend(friendResult.id)}>Add friend</button>}</p>}<h3>Requests ({pending.length})</h3>{pending.map(f=><p key={f.id}>@{f.requester?.username} <button onClick={()=>acceptFriend(f.id)}>Accept</button></p>)}<h3>My friends</h3>{accepted.length===0&&<p className="muted">No friends yet.</p>}{accepted.map(f=>{const person=f.requester_id===uid?f.addressee:f.requester;return <p key={f.id}><button className="subtle" onClick={()=>openFriend(person)}>@{person?.username} → View profile</button></p>})}{selectedFriend&&<section className="friend-detail"><h2>{selectedFriend.display_name||selectedFriend.username}</h2>{selectedFriend.avatar_url&&<img className="avatar" src={selectedFriend.avatar_url} alt="Profile"/>}<p>Favorite this year: {friendBooks.find(b=>b.id===selectedFriend.top_book_year_id)?.title||'Not selected'}</p><p>All-time favorite: {friendBooks.find(b=>b.id===selectedFriend.top_book_all_id)?.title||'Not selected'}</p><h3>Currently reading</h3>{bookList(friendBooks.filter(b=>b.status==='Reading'),false)}<h3>Books finished</h3>{bookList(friendBooks.filter(b=>b.status==='Finished'),false)}</section>}</section></>}
  {tab==='Home' && bookDetail && (
    <div className="book-modal-backdrop" onClick={()=>setBookDetail(null)}>
      <section className="book-modal" role="dialog" aria-modal="true" aria-label="Book details" onClick={e=>e.stopPropagation()}>
        <button className="modal-close subtle" onClick={()=>setBookDetail(null)} aria-label="Close">×</button>
        <div className="modal-book-info">
          {bookDetail.cover_url && <img src={bookDetail.cover_url} alt="Book cover"/>}
          <div><h2>{bookDetail.title}</h2><p>by {bookDetail.author}</p>
            {bookDetail.published && <p className="muted">First published {bookDetail.published}</p>}
            <p>{bookDetailBusy ? 'Loading description…' : bookDetail.summary || 'No description available.'}</p>
          </div>
        </div>
        <div className="actions">{statuses.map(s=><button key={s} onClick={()=>addBook(bookDetail,s)}>{s}</button>)}</div>
      </section>
    </div>
  )}
  {managedBook && (
    <div className="book-modal-backdrop" onClick={()=>{setManagedBook(null);setCompletionEditor(null)}}>
      <section className="book-modal" role="dialog" aria-modal="true" aria-label="Book details" onClick={e=>e.stopPropagation()}>
        <button className="modal-close subtle" onClick={()=>{setManagedBook(null);setCompletionEditor(null)}} aria-label="Close">×</button>
        <div className="modal-book-info">
          {managedBook.cover_url && <img src={managedBook.cover_url} alt="Book cover"/>}
          <div><h2>{managedBook.title}</h2><p>by {managedBook.author}</p>
            <p className="muted">{managedBook.status}{managedBook.status==='Finished' ? ' · Completed ' + (managedBook.finished_date ? new Date(managedBook.finished_date+'T12:00:00').toLocaleDateString() : managedBook.finished_year || 'date not specified') : ''}</p>
          </div>
        </div>
        {managedBook.editable && <>
          <h3>Manage book</h3>
          <label>Reading status
            <select value={managedBook.status} onChange={async e=>{await changeStatus(managedBook.id,e.target.value);setManagedBook({...managedBook,status:e.target.value})}}>
              {statuses.map(status=><option key={status}>{status}</option>)}
            </select>
          </label>
          {managedBook.status==='Finished' && <>
            <button className="subtle" onClick={()=>beginCompletion(managedBook)}>Edit completion date</button>
            {completionEditor===managedBook.id && <div className="completion-editor">
              <label>Completion precision
                <select value={completionMode} onChange={e=>{setCompletionMode(e.target.value);setCompletionValue('')}}>
                  <option value="year">Year only</option><option value="date">Full date</option>
                </select>
              </label>
              <input aria-label="Completion year or date" type={completionMode==='year'?'number':'date'} min={completionMode==='year'?'1000':undefined} max={completionMode==='year'?new Date().getFullYear():new Date().toISOString().slice(0,10)} placeholder="2024" value={completionValue} onChange={e=>setCompletionValue(e.target.value)}/>
              <div className="actions"><button onClick={async()=>{await saveCompletion(managedBook.id);setManagedBook(null)}}>Save</button><button className="subtle" onClick={()=>setCompletionEditor(null)}>Cancel</button></div>
            </div>}
          </>}
          <button className="subtle" onClick={async()=>{if(window.confirm('Remove ' + managedBook.title + ' from your library?')){await removeBook(managedBook.id);setManagedBook(null)}}}>Remove from library</button>
        </>}
      </section>
    </div>
  )}
 </main><footer>Verlio · Your reading life, together.</footer></div></div>;
}
createRoot(document.getElementById('root')).render(<App/>);
