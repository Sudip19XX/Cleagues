import{_ as J}from"./wallet-evm-D7HrI6pR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();function Re(e,t=6,r=4){return e?e.length<=t+r?e:`${e.slice(0,t)}...${e.slice(-r)}`:""}function S(e,t={}){const{currency:r="USD",minimumFractionDigits:a=2,maximumFractionDigits:i=6,compact:n=!1}=t;return e==null?"$0.00":n&&Math.abs(e)>=1e3?pt(e,{prefix:"$"}):new Intl.NumberFormat("en-US",{style:"currency",currency:r,minimumFractionDigits:a,maximumFractionDigits:i}).format(e)}function U(e,t=2){return e==null?"0.00%":`${e>=0?"+":""}${e.toFixed(t)}%`}function pt(e,t={}){const{decimals:r=2,prefix:a="",suffix:i=""}=t;if(e==null)return`${a}0${i}`;const n=Math.abs(e),s=e<0?"-":"";return n>=1e9?`${s}${a}${(e/1e9).toFixed(r)}B${i}`:n>=1e6?`${s}${a}${(e/1e6).toFixed(r)}M${i}`:n>=1e3?`${s}${a}${(e/1e3).toFixed(r)}K${i}`:`${s}${a}${e.toFixed(r)}${i}`}function R(e){return e>0?"positive":e<0?"negative":"neutral"}const $={EVM:"evm",SOLANA:"solana"},G={CRYPTO_DUEL:{name:"Crypto Duel",description:"Select two distinct tokens and predict which will outperform the other in real-time. It's a battle of relative strength—choose the stronger contender to claim victory.",path:"/crypto-duel",icon:`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vs-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
          </defs>
          <style>
             @keyframes pulse-vs {
               0%, 100% { transform: scale(1); }
               50% { transform: scale(1.1); }
             }
             .vs-text { animation: pulse-vs 2s ease-in-out infinite; transform-origin: center; }
          </style>
          <text x="32" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#09C285" style="font-style: italic; letter-spacing: -2px;" class="vs-text">VS</text>
        </svg>`},DREAM_TEAM:{name:"Dream Team",description:"Assemble a squad of 15 tokens, predict market movements, and outperform other players. Climb the leaderboards & get massive rewards.",path:"/dream-team",icon:`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="team-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
          </defs>
          <!-- Center person (appears first) -->
          <g class="team-member-1">
            <circle cx="32" cy="22" r="6" fill="url(#team-grad)" stroke="none"/>
            <path d="M20 48C20 38 25 34 32 34C39 34 44 38 44 48" fill="url(#team-grad)" stroke="none"/>
          </g>
          
          <!-- Left front person (appears second - 0.5s delay) -->
          <g class="team-member-2">
            <circle cx="16" cy="26" r="5" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
            <path d="M8 48C8 40 11 36 16 36C21 36 24 40 24 48" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
          </g>
          
          <!-- Right front person (appears third - 1s delay) -->
          <g class="team-member-3">
            <circle cx="48" cy="26" r="5" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
            <path d="M40 48C40 40 43 36 48 36C53 36 56 40 56 48" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
          </g>
          
          <!-- Left back person (appears fourth - 1.5s delay) -->
          <g class="team-member-4">
            <circle cx="10" cy="30" r="4" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
            <path d="M4 48C4 42 6 38 10 38C14 38 16 42 16 48" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
          </g>
          
          <!-- Right back person (appears fifth - 2s delay) -->
          <g class="team-member-5">
            <circle cx="54" cy="30" r="4" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
            <path d="M48 48C48 42 50 38 54 38C58 38 60 42 60 48" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
          </g>
        </svg>`},TIME_BASED:{name:"1min Frenzy",description:"Feel the rush with quick decisions. Predict the price movement in just 60 seconds. Beat the high-intensity race against time.",path:"/time-based",icon:`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="time-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
          </defs>
          <style>
              @keyframes tick-tock {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
              .clock-hand {
                  transform-origin: 32px 36px;
                  animation: tick-tock 2s linear infinite;
              }
          </style>

          <!-- Top Plunger Button (y=16 to 20) -->
          <rect x="25" y="16" width="14" height="4" rx="2" stroke="url(#time-grad)" stroke-width="2.5" fill="none"/>
          
          <!-- Stem (y=20 to 24) -->
          <path d="M32 20 V 24" stroke="url(#time-grad)" stroke-width="2.5"/>

          <!-- Body (y=24 to 48, cy=36, r=12) -->
          <circle cx="32" cy="36" r="12" stroke="url(#time-grad)" stroke-width="2.5"/>

          <!-- Side Button -->
          <path d="M42 27 L45 24" stroke="url(#time-grad)" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Hands -->
          <g class="clock-hand">
             <path d="M32 36 V 28" stroke="url(#time-grad)" stroke-width="2.5" stroke-linecap="round"/>
             <path d="M32 36 L 37 41" stroke="url(#time-grad)" stroke-width="2.5" stroke-linecap="round"/>
          </g>
          
          <!-- Center Dot -->
          <circle cx="32" cy="36" r="2" fill="url(#time-grad)"/>
        </svg>`},PREDICT_CANDLE:{name:"Predict Candle",description:"Put your technical analysis skills to the test. Study market patterns to forecast the direction of the upcoming candle. Will it close green or red?",path:"/predict-candle",icon:`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
            <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#EF4444"/>
              <stop offset="100%" style="stop-color:#DC2626"/>
            </linearGradient>
          </defs>
          <style>
            @keyframes slide-up {
              0% { opacity: 0; transform: translateY(15px); }
              20% { opacity: 1; transform: translateY(0); }
              80% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(0); }
            }
            @keyframes slide-down {
              0% { opacity: 0; transform: translateY(-15px); }
              20% { opacity: 1; transform: translateY(0); }
              80% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(0); }
            }
            
            .c-anim { opacity: 0; }
            
            .candle-1 { animation: slide-up 4s ease-out infinite; animation-delay: 0s; }
            .candle-2 { animation: slide-down 4s ease-out infinite; animation-delay: 0.8s; }
            .candle-3 { animation: slide-up 4s ease-out infinite; animation-delay: 1.6s; }
            .candle-4 { animation: slide-down 4s ease-out infinite; animation-delay: 2.4s; }
            .candle-5 { animation: slide-up 4s ease-out infinite; animation-delay: 3.2s; }
          </style>

          <!-- Candle 1 - Green (Up) -->
          <g class="candle-1 c-anim">
            <line x1="12" y1="20" x2="12" y2="48" stroke="url(#green-grad)" stroke-width="2"/>
            <rect x="9" y="30" width="6" height="12" fill="url(#green-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 2 - Red (Down) -->
          <g class="candle-2 c-anim">
            <line x1="22" y1="18" x2="22" y2="46" stroke="url(#red-grad)" stroke-width="2"/>
            <rect x="19" y="24" width="6" height="12" fill="url(#red-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 3 - Green (Up) -->
          <g class="candle-3 c-anim">
            <line x1="32" y1="22" x2="32" y2="50" stroke="url(#green-grad)" stroke-width="2"/>
            <rect x="29" y="32" width="6" height="14" fill="url(#green-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 4 - Red (Down) -->
          <g class="candle-4 c-anim">
            <line x1="42" y1="16" x2="42" y2="44" stroke="url(#red-grad)" stroke-width="2"/>
            <rect x="39" y="22" width="6" height="14" fill="url(#red-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 5 - Green (Up) -->
          <g class="candle-5 c-anim">
            <line x1="52" y1="14" x2="52" y2="42" stroke="url(#green-grad)" stroke-width="2"/>
            <rect x="49" y="20" width="6" height="16" fill="url(#green-grad)" rx="1" stroke="none"/>
          </g>
        </svg>`},PVP_MODE:{name:"PvP Battle",description:"One player goes Long, the other goes Short—only <strong>one can win</strong>. Lock in your prediction and challenge an opponent in this winner-takes-all showdown.",path:"/pvp-battle",icon:`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        @keyframes clash-l-strike {
           0%, 100% { transform: translate(0, 0) rotate(0deg); } /* Crossed Guard */
           20% { transform: translate(-4px, 4px) rotate(-15deg); } /* Windup (Pull back) */
           40% { transform: translate(2px, -2px) rotate(5deg); } /* Strike/Clash! */
           60% { transform: translate(0, 0) rotate(0deg); } /* Recoil/Return */
        }
        @keyframes clash-r-strike {
           0%, 100% { transform: translate(0, 0) rotate(0deg); } /* Crossed Guard */
           20% { transform: translate(4px, 4px) rotate(15deg); } /* Windup (Pull back) */
           40% { transform: translate(-2px, -2px) rotate(-5deg); } /* Strike/Clash! */
           60% { transform: translate(0, 0) rotate(0deg); } /* Recoil/Return */
        }
        .sword-main-l {
           transform-origin: center;
           animation: clash-l-strike 1.2s infinite ease-in-out;
           transform-box: fill-box;
        }
        .sword-main-r {
           transform-origin: center;
           animation: clash-r-strike 1.2s infinite ease-in-out;
           transform-box: fill-box;
        }
      </style>
      <g transform="translate(14, 14) scale(1.5)">
        <!-- Green Sword (Left/Up) -->
        <g class="sword-main-l">
          <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z" stroke="#09C285" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 13l6 6" stroke="#09C285" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <!-- Red Sword (Right/Down) -->
        <g class="sword-main-r">
          <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 5.5l-2 -2.5h-5v5l3 2.5" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
    </svg>`}},O={ONE_MIN:{hours:1/60,label:"1M",minutes:1},TEN_MINS:{hours:10/60,label:"10M",minutes:10},THIRTY_MINS:{hours:.5,label:"30M",minutes:30},ONE_HOUR:{hours:1,label:"1H",minutes:60},FOUR_HOURS:{hours:4,label:"4H",minutes:240},ONE_DAY:{hours:24,label:"1D",minutes:1440}},_e={COINGECKO_MARKETS:"https://api.coingecko.com/api/v3/coins/markets",COINGECKO_PRICE:"https://api.coingecko.com/api/v3/simple/price"},je={WALLET_PREFERENCE:"crypto_leagues_wallet_pref"};function mt(e,t=null){try{const r=localStorage.getItem(e);return r?JSON.parse(r):t}catch(r){return console.error(`Error reading from localStorage (${e}):`,r),t}}function gt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(r){console.error(`Error writing to localStorage (${e}):`,r)}}function ut(){return mt(je.WALLET_PREFERENCE)}function he(e){gt(je.WALLET_PREFERENCE,e)}class ht{constructor(){this.currentChain=null,this.address=null,this.provider=null,this.listeners=[]}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(r=>r!==t)}}notify(){const t=this.getState();this.listeners.forEach(r=>r(t))}getState(){return{chain:this.currentChain,address:this.address,connected:!!this.address,provider:this.provider}}async connectEVM(){try{if(!window.ethereum)throw new Error("No Ethereum wallet found. Please install MetaMask.");const t=await window.ethereum.request({method:"eth_requestAccounts"});if(t.length===0)throw new Error("No accounts found");return this.currentChain=$.EVM,this.address=t[0],this.provider=window.ethereum,this.setupEVMListeners(),he({chain:$.EVM,address:this.address}),this.notify(),{success:!0,address:this.address,chain:this.currentChain}}catch(t){throw console.error("Error connecting to EVM wallet:",t),t}}async connectSolana(){try{if(!window.solana||!window.solana.isPhantom)throw new Error("No Solana wallet found. Please install Phantom.");const t=await window.solana.connect();return this.currentChain=$.SOLANA,this.address=t.publicKey.toString(),this.provider=window.solana,this.setupSolanaListeners(),he({chain:$.SOLANA,address:this.address}),this.notify(),{success:!0,address:this.address,chain:this.currentChain}}catch(t){throw console.error("Error connecting to Solana wallet:",t),t}}async disconnect(){this.currentChain===$.SOLANA&&window.solana&&await window.solana.disconnect(),this.currentChain=null,this.address=null,this.provider=null,he(null),this.notify()}setupEVMListeners(){window.ethereum&&(window.ethereum.on("accountsChanged",t=>{t.length===0?this.disconnect():(this.address=t[0],this.notify())}),window.ethereum.on("chainChanged",()=>{window.location.reload()}),window.ethereum.on("disconnect",()=>{this.disconnect()}))}setupSolanaListeners(){window.solana&&(window.solana.on("accountChanged",t=>{t?(this.address=t.toString(),this.notify()):this.disconnect()}),window.solana.on("disconnect",()=>{this.disconnect()}))}async getBalance(){if(!this.address)return"0";try{if(this.currentChain===$.EVM&&window.ethereum){const t=await window.ethereum.request({method:"eth_getBalance",params:[this.address,"latest"]});return(parseInt(t,16)/1e18).toFixed(4)}else if(this.currentChain===$.SOLANA&&window.solana)return"0"}catch(t){return console.error("Error getting balance:",t),"0"}}async signMessage(t){if(!this.address)throw new Error("No wallet connected");try{if(this.currentChain===$.EVM&&window.ethereum)return await window.ethereum.request({method:"personal_sign",params:[t,this.address]});if(this.currentChain===$.SOLANA&&window.solana){const r=new TextEncoder().encode(t);return(await window.solana.signMessage(r,"utf8")).signature}}catch(r){throw console.error("Error signing message:",r),r}}async autoConnect(){const t=ut();if(!t)return!1;try{if(t.chain===$.EVM)return await this.connectEVM(),!0;if(t.chain===$.SOLANA)return await this.connectSolana(),!0}catch(r){return console.error("Auto-connect failed:",r),!1}}}const C=new ht;function vt(e){const t=document.createElement("button");t.className="wallet-button",t.innerHTML=`
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
    </svg>
    <span class="wallet-text">Connect Wallet</span>
  `;const r=a=>{a.connected?(t.innerHTML=`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="wallet-address">${Re(a.address)}</span>
      `,t.classList.add("connected")):(t.innerHTML=`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>
        <span class="wallet-text">Connect Wallet</span>
      `,t.classList.remove("connected"))};return C.subscribe(r),r(C.getState()),t.addEventListener("click",()=>{C.getState().connected?ft(t):yt()}),e.appendChild(t),t}function yt(){const e=document.createElement("div");e.className="modal-overlay",e.style.animation="fadeIn 0.2s ease-out";const t=document.createElement("div");t.className="modal",t.style.maxWidth="400px",t.innerHTML=`
    <button class="modal-close">×</button>
    <h2 class="modal-title">Connect Wallet</h2>
    <div class="modal-body">
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
        Choose your preferred blockchain to get started
      </p>
      
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        <button class="wallet-option" data-chain="${$.EVM}">
          <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; padding: 6px;">
              <svg viewBox="0 0 318.6 318.6" style="width: 100%; height: 100%;">
                <path fill="#E2761B" stroke="#E2761B" d="M274.1,35.5l-99.5,73.9L193,65.8z"/>
                <path fill="#E4761B" stroke="#E4761B" d="M44.4,35.5l98.7,74.6l-17.5-44.3L44.4,35.5z M238.3,206.8l-26.5,40.6l56.7,15.6l16.3-55.3 L238.3,206.8z M33.9,207.7L50.1,263l56.7-15.6l-26.5-40.6L33.9,207.7z"/>
                <path fill="#E4761B" stroke="#E4761B" d="M103.6,138.2l-15.8,23.9l56.3,2.5l-2-60.5L103.6,138.2z M214.9,138.2l-39.2-34.8l-1.3,61.2 l56.2-2.5L214.9,138.2z M106.8,247.4l33.8-16.5l-29.2-22.8L106.8,247.4z M177.9,230.9l33.9,16.5l-4.7-39.3L177.9,230.9z"/>
                <path fill="#D7C1B3" stroke="#D7C1B3" d="M211.8,247.4l-33.9-16.5l2.7,22.1l-0.3,9.3L211.8,247.4z M106.8,247.4l31.5,14.9l-0.2-9.3 l2.5-22.1l-33.8,16.5H106.8z"/>
                <path fill="#233447" stroke="#233447" d="M138.8,193.5l-28.2-8.3l19.9-9.1L138.8,193.5z M179.7,193.5l8.3-17.4l20,9.1L179.7,193.5z"/>
                <path fill="#CD6116" stroke="#CD6116" d="M106.8,247.4l4.8-40.6l-31.3,0.9L106.8,247.4z M207,206.8l4.8,40.6l26.5-39.7L207,206.8z M230.8,162.1l-56.2,2.5l5.2,28.9l8.3-17.4l20,9.1L230.8,162.1z M110.6,185.2l20-9.1l8.2,17.4l5.3-28.9l-56.3-2.5L110.6,185.2z"/>
                <path fill="#E4751F" stroke="#E4751F" d="M87.8,162.1l23.6,46l-0.8-22.9L87.8,162.1z M208.1,185.2l-1,22.9l23.7-46L208.1,185.2z M144.1,164.6l-5.3,28.9l6.6,34.1l1.5-44.9L144.1,164.6z M174.6,164.6l-2.7,18l1.2,45l6.7-34.1L174.6,164.6z"/>
                <path fill="#F6851B" stroke="#F6851B" d="M179.8,193.5l-6.7,34.1l4.8,3.3l29.2-22.8l1-22.9L179.8,193.5z M110.6,185.2l0.8,22.9l29.2,22.8 l4.8-3.3l-6.6-34.1L110.6,185.2z"/>
                <path fill="#C0AD9E" stroke="#C0AD9E" d="M180,262.3l0.3-9.3l-2.5-2.2h-37.7l-2.3,2.2l0.2,9.3l-31.5-14.9l11,9l22.3,15.5h38.3 l22.4-15.5l11-9L180,262.3z"/>
                <path fill="#161616" stroke="#161616" d="M177.9,230.9l-4.8-3.3h-27.7l-4.8,3.3l-2.5,22.1l2.3-2.2h37.7l2.5,2.2L177.9,230.9z"/>
                <path fill="#763D16" stroke="#763D16" d="M278.3,114.2l8.5-40.8l-12.7-37.9l-96.2,71.4l37,31.3l52.3,15.3l11.6-13.5l-5-3.6l8-7.3 l-6.2-4.8l8-6.1L278.3,114.2z M31.8,73.4l8.5,40.8l-5.4,4l8,6.1l-6.1,4.8l8,7.3l-5,3.6l11.5,13.5l52.3-15.3l37-31.3L44.4,35.5 L31.8,73.4z"/>
                <path fill="#F6851B" stroke="#F6851B" d="M267.2,153.5l-52.3-15.3l15.9,23.9l-23.7,46l31.2-0.4h46.5L267.2,153.5z M103.6,138.2l-52.3,15.3 l-17.4,54.4h46.4l31.1,0.4l-23.6-46L103.6,138.2z M174.6,164.6l3.3-57.7l15.2-41.1h-67.5l15,41.1l3.5,57.7l1.2,18.2l0.1,44.8h27.7 l0.2-44.8L174.6,164.6z"/>
              </svg>
            </div>
            <div style="flex: 1; text-align: left;">
              <div style="font-weight: 600; margin-bottom: 4px;">EVM Wallet</div>
              <div style="font-size: 0.875rem; color: var(--color-text-muted);">MetaMask, Coinbase Wallet, etc.</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </div>
        </button>

        <button class="wallet-option" data-chain="${$.SOLANA}">
          <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #14141f 0%, #1a1a2e 100%); display: flex; align-items: center; justify-content: center; padding: 8px;">
              <svg viewBox="0 0 397.7 311.7" style="width: 100%; height: 100%;">
                <defs>
                  <linearGradient id="solana-grad1" x1="360.88" y1="351.46" x2="-8.46" y2="-8.88" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#00ffa3"/>
                    <stop offset="1" stop-color="#dc1fff"/>
                  </linearGradient>
                  <linearGradient id="solana-grad2" x1="264.83" y1="401.6" x2="-104.51" y2="32.25" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#00ffa3"/>
                    <stop offset="1" stop-color="#dc1fff"/>
                  </linearGradient>
                  <linearGradient id="solana-grad3" x1="312.55" y1="376.68" x2="-56.79" y2="7.34" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#00ffa3"/>
                    <stop offset="1" stop-color="#dc1fff"/>
                  </linearGradient>
                </defs>
                <path d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z" fill="url(#solana-grad1)"/>
                <path d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z" fill="url(#solana-grad2)"/>
                <path d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4 c5.8,0,8.7-7,4.6-11.1L333.1,120.1z" fill="url(#solana-grad3)"/>
              </svg>
            </div>
            <div style="flex: 1; text-align: left;">
              <div style="font-weight: 600; margin-bottom: 4px;">Solana Wallet</div>
              <div style="font-size: 0.875rem; color: var(--color-text-muted);">Phantom, Solflare, etc.</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  `,e.appendChild(t),document.body.appendChild(e),t.querySelector(".modal-close").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",i=>{i.target===e&&e.remove()}),t.querySelectorAll(".wallet-option").forEach(i=>{i.addEventListener("click",async()=>{const n=i.dataset.chain;i.innerHTML='<div class="loading"></div> Connecting...',i.disabled=!0;try{n===$.EVM?await C.connectEVM():n===$.SOLANA&&await C.connectSolana(),e.remove()}catch(s){alert(s.message),i.disabled=!1,location.reload()}})})}function ft(e){const t=e.querySelector(".wallet-menu");if(t){t.remove();return}const r=document.createElement("div");r.className="wallet-menu";const a=e.offsetWidth;r.style.cssText=`
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background: var(--color-bg-secondary);
    border: 1px solid var(--glass-border);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    padding: var(--spacing-xs);
    width: ${a}px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: fadeIn 0.15s ease-out;
  `;const i=C.getState(),n=i.chain===$.EVM?"EVM":"SOL",s=i.chain===$.EVM?"#E2761B":"#9945FF";r.innerHTML=`
    <!-- Network tag centered -->
    <div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs); padding: var(--spacing-sm) var(--spacing-md);">
      <span style="font-size: 0.7rem; color: ${s}; background: ${s}20; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${n}</span>
      <span style="width: 6px; height: 6px; background: #09C285; border-radius: 50%;"></span>
    </div>
    
    <!-- Address with copy button -->
    <div class="wallet-menu-item" style="padding: var(--spacing-xs) var(--spacing-md); display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs);">
      <span style="font-size: 0.8rem; font-family: monospace; color: var(--color-text-secondary);">${Re(i.address)}</span>
      <button id="copy-address" style="background: none; border: none; cursor: pointer; padding: 2px; color: var(--color-text-muted); display: flex;" title="Copy address">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
    
    <div style="height: 1px; background: var(--glass-border); margin: var(--spacing-xs) 0;"></div>
    
    <!-- Rewards -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Rewards</span>
    </div>
    
    <!-- Transactions -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Transactions</span>
    </div>
    
    <div style="height: 1px; background: var(--glass-border); margin: var(--spacing-xs) 0;"></div>
    
    <!-- Documentation -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Documentation</span>
    </div>
    
    <!-- Privacy Policy -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Privacy Policy</span>
    </div>
    
    <!-- FAQs -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">FAQs</span>
    </div>
    
    <div style="height: 1px; background: var(--glass-border); margin: var(--spacing-xs) 0;"></div>
    
    <!-- Logout -->
    <div class="wallet-menu-item" id="disconnect-wallet" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm); cursor: pointer; color: var(--color-danger);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      <span style="font-size: 0.9rem;">Logout</span>
    </div>
  `,e.style.position="relative",e.appendChild(r),r.querySelector("#copy-address").addEventListener("click",o=>{o.stopPropagation(),navigator.clipboard.writeText(i.address);const l=r.querySelector("#copy-address");l.innerHTML=`
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `,setTimeout(()=>{l.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `},1500)}),r.querySelector("#disconnect-wallet").addEventListener("click",async()=>{await C.disconnect(),r.remove()}),setTimeout(()=>{document.addEventListener("click",function o(l){!r.contains(l.target)&&l.target!==e&&(r.remove(),document.removeEventListener("click",o))})},0)}const Ge=document.createElement("style");Ge.textContent=`
  .wallet-option {
    width: 100%;
    padding: var(--spacing-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
    color: var(--color-text-primary);
    font-family: var(--font-primary);
  }

  .wallet-option:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
  }

  .menu-item {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.875rem;
  }

  .menu-item:hover {
    background: var(--glass-bg);
  }

  .wallet-menu-item {
    transition: background 0.15s ease;
    border-radius: var(--radius-sm);
  }

  .wallet-menu-item:hover {
    background: var(--glass-bg);
  }



  .wallet-address {
    font-family: var(--font-primary);
  }
`;document.head.appendChild(Ge);function bt(){const e=document.createElement("header");e.className="header";const t=document.createElement("div");t.className="header-container";const r=document.createElement("a");r.href="#/",r.className="logo",r.innerHTML=`
    <img class="logo-icon" src="/assets/logo.png" alt="Crypto Leagues" width="36" height="36" style="object-fit: contain;" />
    <div class="logo-text">
      <div><span class="logo-first-letter">C</span>RYPTO</div>
      <div><span class="logo-first-letter">L</span>EAGUES</div>
    </div>
  `,r.addEventListener("click",l=>{l.preventDefault(),ae("/")});const a=document.createElement("nav");a.className="nav",a.style.display="none";const i=document.createElement("div");i.style.display="flex",i.style.alignItems="center",i.style.gap="var(--spacing-md)",vt(i);const n=document.createElement("label");n.className="theme-switch",n.innerHTML=`
    <input type="checkbox" id="dark-mode-checkbox">
    <span class="theme-slider"></span>
  `;const s=n.querySelector("input");return localStorage.getItem("darkMode")!=="false"?(document.documentElement.classList.add("dark-mode"),document.body.classList.add("dark-mode"),s.checked=!0):(document.documentElement.classList.remove("dark-mode"),document.body.classList.remove("dark-mode"),s.checked=!1),s.addEventListener("change",l=>{l.target.checked?(document.documentElement.classList.add("dark-mode"),document.body.classList.add("dark-mode"),localStorage.setItem("darkMode","true")):(document.documentElement.classList.remove("dark-mode"),document.body.classList.remove("dark-mode"),localStorage.setItem("darkMode","false"))}),i.appendChild(n),t.appendChild(r),t.appendChild(i),e.appendChild(t),e}function xt(){const e=document.createElement("aside");return e.id="sidebar",e.className="sidebar",e.innerHTML=`
    <div class="sidebar-content">
      <div class="sidebar-section">
        <div class="sidebar-category">
          <div class="sidebar-category-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span style="white-space: nowrap; font-size: 0.85rem;">League Originals</span>
          </div>
          
          <div class="sidebar-links">
            <a href="#dream-team" class="sidebar-link" data-page="dream-team">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <style>
                  @keyframes team-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                  }
                  .sidebar-link.active .dream-team-filled { 
                    fill: #09C285; 
                    stroke: #09C285; 
                    fill-opacity: 0.2; 
                    animation: team-bounce 2s infinite ease-in-out;
                  }
                  .sidebar-link.active .dream-team-outline {
                    animation: team-bounce 2s infinite ease-in-out 0.2s;
                  }
                  .dream-team-filled, .dream-team-outline { transition: all 0.2s; }
                </style>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" class="dream-team-outline"></path>
                <circle cx="9" cy="7" r="4" class="dream-team-filled"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" class="dream-team-filled"></path>
              </svg>
              <span>Dream Team</span>
            </a>
            <a href="#pvp-battle" class="sidebar-link" data-page="pvp-battle">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <style>
                   @keyframes swords-pulse {
                     0%, 100% { transform: scale(1); }
                     50% { transform: scale(1.1); }
                   }
                   .sidebar-link.active .swords-path {
                     stroke: #09C285;
                     animation: swords-pulse 1.5s infinite ease-in-out;
                     transform-origin: center;
                     transform-box: fill-box;
                   }
                 </style>
                 <g class="swords-path">
                   <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                   <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z" />
                   <path d="M5 13l6 6" />
                   <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" />
                   <path d="M10 5.5l-2 -2.5h-5v5l3 2.5" />
                 </g>
               </svg>
               <span>PvP Battle</span>
            </a>
            

            <a href="#predict-candle" class="sidebar-link" data-page="predict-candle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2">
                <style>
                  @keyframes candle-fluctuate {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.7); }
                  }
                  .candle-line { 
                    stroke: currentColor; 
                    transition: stroke 0.2s; 
                    transform-origin: bottom;
                    transform-box: fill-box;
                  }
                  .sidebar-link.active .candle-green { 
                    stroke: #09C285; 
                    animation: candle-fluctuate 1.5s infinite ease-in-out alternate;
                  }
                  .sidebar-link.active .candle-red { 
                    stroke: #FF4D4F; 
                    animation: candle-fluctuate 2s infinite ease-in-out alternate-reverse;
                  }
                </style>
                <line x1="5" y1="6" x2="5" y2="18" stroke-width="2.5" class="candle-line candle-green"/>
                <line x1="10" y1="10" x2="10" y2="20" stroke-width="2.5" class="candle-line candle-red"/>
                <line x1="15" y1="4" x2="15" y2="16" stroke-width="2.5" class="candle-line candle-green"/>
                <line x1="20" y1="8" x2="20" y2="18" stroke-width="2.5" class="candle-line candle-red"/>
              </svg>
              <span>Predict Candle</span>
            </a>
            
            <a href="#time-based" class="sidebar-link" data-page="time-based">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <style>
                  @keyframes tick-sidebar {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  .tick-hand-sidebar {
                    transform-origin: 12px 14px;
                  }
                  /* Animate only when active */
                  .sidebar-link.active .tick-hand-sidebar {
                    animation: tick-sidebar 2s steps(60) infinite;
                  }
                </style>
                <circle cx="12" cy="14" r="9" />
                <path d="M12 5V2M10 2h4" />
                <line x1="12" y1="14" x2="12" y2="8" stroke="currentColor" stroke-width="1.5" class="tick-hand-sidebar"/>
              </svg>
              <span>1min Frenzy</span>
            </a>

            <a href="#crypto-duel" class="sidebar-link" data-page="crypto-duel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <style>
                  @keyframes vs-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                  }
                  .vs-text { 
                    fill: currentColor; 
                    stroke: none; 
                    transition: fill 0.2s; 
                    transform-origin: center; 
                    transform-box: fill-box;
                  }
                  .sidebar-link.active .vs-text { 
                    fill: #09C285; 
                    animation: vs-pulse 1.5s infinite ease-in-out;
                  }
                </style>
                <text x="12" y="16" font-size="12" font-weight="bold" text-anchor="middle" class="vs-text">VS</text>
              </svg>
              <span>Crypto Duel</span>
            </a>


          </div>
        </div>
        
        <!-- Prediction Category -->
        <div class="sidebar-category" style="margin-top: var(--spacing-md); border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md);">
          <div class="sidebar-category-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
              <path d="M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-.8 2.8-2 3.5"></path>
            </svg>
            <span style="white-space: nowrap; font-size: 0.85rem;">Prediction</span>
          </div>
          
          <div class="sidebar-links">
            <span style="font-size: 0.75rem; color: var(--color-text-muted); padding: 0.5rem 0.75rem; display: block;">Coming Soon</span>
          </div>
        </div>
      </div>
      
      <!-- Footer Section -->
      <div class="sidebar-footer">
        <a href="#faqs" class="sidebar-footer-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>FAQs</span>
        </a>
        <a href="#terms" class="sidebar-footer-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span>Terms & Conditions</span>
        </a>
        <a href="#team" class="sidebar-footer-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Crypto Leagues Team</span>
        </a>
      </div>
      
      <!-- Live data indicator - pinned to bottom -->
      <div class="sidebar-live-indicator" style="
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: var(--spacing-sm) var(--spacing-md);
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255,255,255,0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      ">
        <div style="width: 6px; height: 6px; background: #09C285; border-radius: 50%; animation: pulse 2s infinite;"></div>
        <span style="font-size: 0.55rem; color: var(--color-text-muted); opacity: 0.7;">Prices & data live from Binance</span>
      </div>
    </div>
  `,e}function wt(){const e=document.querySelectorAll(".sidebar-link");e.forEach(r=>{r.addEventListener("click",a=>{a.preventDefault(),e.forEach(n=>n.classList.remove("active")),r.classList.add("active");const i=r.dataset.page;window.dispatchEvent(new CustomEvent("navigate",{detail:{page:i}}))})});const t=()=>{let r=window.location.hash.slice(1)||"home";r.startsWith("/")&&(r=r.slice(1)),e.forEach(i=>i.classList.remove("active"));const a=document.querySelector(`.sidebar-link[data-page="${r}"]`);a&&a.classList.add("active")};t(),window.addEventListener("hashchange",t),window.addEventListener("popstate",t)}function kt(){const e=document.createElement("div");e.className="home-page";const t=Lt();e.appendChild(t);const r=Tt();e.appendChild(r);const a=Et();e.appendChild(a);const i=$t();return e.appendChild(i),e}function Tt(){const e=document.createElement("section");e.style.cssText=`
    padding: var(--spacing-3xl) 0;
    text-align: center;
  `;const t=document.createElement("div");return t.className="container",t.innerHTML=`
    <h1 style="font-size: 4rem; margin-bottom: var(--spacing-lg); animation: fadeIn 0.8s ease-out; color: #000000;">
      CRYPTO LEAGUES
    </h1>
    <p style="font-size: 1.2rem; line-height: 1.6; color: var(--color-text-secondary); margin-bottom: var(--spacing-2xl); max-width: 800px; margin-left: auto; margin-right: auto; animation: fadeIn 0.8s ease-out 0.2s both;">
      Experience the future of crypto fantasy trading. Compete in high-stakes leagues, predict market movements with precision, and build your dream portfolio.
      Master the markets, climb the global leaderboards, and earn real rewards in a decentralized, skill-based ecosystem.
    </p>
    <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; animation: fadeIn 0.8s ease-out 0.4s both;">
      <button class="btn btn-primary btn-lg" id="get-started">
        Get Started
      </button>
      <button class="btn btn-secondary btn-lg" id="learn-more">
        Learn More
      </button>
    </div>
  `,e.appendChild(t),setTimeout(()=>{const r=e.querySelector("#get-started"),a=e.querySelector("#learn-more");r==null||r.addEventListener("click",()=>{ae("/dream-team")}),a==null||a.addEventListener("click",()=>{alert("Crypto Leagues is a Web3 fantasy trading platform where you can compete with other players by predicting crypto price movements!")})},0),e}function Et(){const e=document.createElement("section");e.id="games",e.style.cssText=`
    padding: var(--spacing-3xl) 0;
    background: transparent;
  `;const t=document.createElement("div");t.className="container";const r=document.createElement("h2");r.textContent="Game Modes",r.style.cssText=`
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    font-size: 2.5rem;
  `,t.appendChild(r);const a=document.createElement("div");a.className="grid",a.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    gap: var(--spacing-md);
    max-width: 1400px;
    padding: 0 var(--spacing-md);
    margin: 0 auto;
    animation: fadeIn 0.8s ease-out;
  `,[G.DREAM_TEAM,G.TIME_BASED,G.PREDICT_CANDLE,G.PVP_MODE,G.CRYPTO_DUEL].forEach((s,o)=>{const l=Ct(s,o);a.appendChild(l)});const n=Mt();return a.appendChild(n),t.appendChild(a),e.appendChild(t),e}function Ct(e,t){const r=document.createElement("div");return r.className="card game-mode-card",r.style.cssText=`
    cursor: pointer;
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--spacing-xl);
    animation: fadeIn 0.6s ease-out ${t*.1}s both;
  `,r.innerHTML=`
    <div style="height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
      <div style="transform: scale(1.2);">
        ${e.icon}
      </div>
    </div>
    <h3 style="margin-bottom: var(--spacing-md); text-align: center; min-height: 1.2em; display: flex; align-items: center;">
      ${e.name}
    </h3>
    <p style="color: var(--color-text-secondary); text-align: center; margin-bottom: var(--spacing-lg); flex-grow: 1;">
      ${e.description}
    </p>
    <button class="btn btn-primary" style="width: max-content; margin: 0 auto; padding-left: var(--spacing-xl); padding-right: var(--spacing-xl);">
      ${St(e.name)}
    </button>
  `,r.addEventListener("click",()=>{ae(e.path)}),r}function St(e){switch(e){case"Dream Team":return"Build Now";case"Crypto Duel":return"Find Duel";case"Predict Candle":return"Predict";case"PvP Battle":return"Compete";default:return"Play Now"}}function Mt(e){const t=document.createElement("div");return t.className="card coming-soon-card",t.style.cssText=`
    width: 100%;
    max-width: 350px;
    animation: fadeIn 0.6s ease-out ${Object.keys(G).length*.1}s both;
    opacity: 0.7;
    cursor: not-allowed;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--spacing-xl);
  `,t.innerHTML=`
    <div style="height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
      <style>
        @keyframes gradient-spin { 
          to { transform: rotate(360deg); } 
        }
        .gradient-ring {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: transparent;
        }
        .gradient-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #09C285, #666666, #333333, #333333, #09C285);
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px));
          animation: gradient-spin 1.2s linear infinite;
        }
      </style>
      <div class="gradient-ring"></div>
    </div>
    <p style="color: var(--color-text-secondary); text-align: center; margin-bottom: var(--spacing-lg);">
      Exciting and competitive modes are coming soon stay tuned for updates!
    </p>

  `,t}function $t(){const e=document.createElement("section");e.id="stats",e.style.cssText=`
    padding: var(--spacing-3xl) 0;
  `;const t=document.createElement("div");t.className="container";const r=document.createElement("h2");r.textContent="Platform Stats",r.style.cssText=`
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    font-size: 2.5rem;
  `,t.appendChild(r);const a=document.createElement("div");return a.className="grid grid-4",a.style.animation="fadeIn 0.8s ease-out",[{label:"Total Players",value:"10,234",icon:"👥"},{label:"Active Games",value:"1,456",icon:"🎮"},{label:"Total Volume",value:"$2.4M",icon:"💰"},{label:"Rewards Paid",value:"$156K",icon:"🏆"}].forEach((n,s)=>{const o=document.createElement("div");o.className="card",o.style.cssText=`
      text-align: center;
      animation: scaleIn 0.6s ease-out ${s*.1}s both;
    `,o.innerHTML=`
      <div style="font-size: 2.5rem; margin-bottom: var(--spacing-sm);">
        ${n.icon}
      </div>
      <div style="font-size: 2rem; font-weight: 700; margin-bottom: var(--spacing-sm); background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        ${n.value}
      </div>
      <div style="color: var(--color-text-secondary); font-size: 0.875rem;">
        ${n.label}
      </div>
    `,a.appendChild(o)}),t.appendChild(a),e.appendChild(t),e}function Lt(){const e=document.createElement("div");return e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    opacity: 0.8;
  `,e.innerHTML=`
    <div style="
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: 
        linear-gradient(rgba(9, 194, 133, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(9, 194, 133, 0.4) 1px, transparent 1px);
      background-size: 40px 40px;
      transform: perspective(500px) rotateX(60deg);
      animation: gridMove 20s linear infinite;
    "></div>
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, transparent 0%, var(--color-bg-primary) 70%);
    "></div>
    <style>
      @keyframes gridMove {
        0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
        100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
      }
    </style>
  `,e}const Pt=["BTC","ETH","XRP","BNB","SOL","TRX","DOGE","ADA","BCH","LINK","HYPE","XLM","XMR","LTC","SUI","AVAX","HBAR","ZEC","SHIB","CRO","TON","MNT","UNI","DOT","AAVE","TAO","BGB","CC","NEAR","ASTER","ETC","ENA","ICP","PEPE","PUMP","KAS","WLD","QNT","POL","APT","ALGO","TRUMP","ARB","VET","FIL","ATOM","RENDER","SEI","CAKE","BONK","IP","JUP","MORPHO","PENGU","AERO","MYX","DASH","OP","VIRTUAL","INJ","STX","STRK","XTZ","TIA","GRT","ETHFI","FLOKI","2Z","ENS","IOTA","PENDLE","PYTH","BAT","LUNC","MERL","FARTCOIN","WIF","SAND","HNT","S","FLOW","JASMY","XPL","GALA","THETA","GNO","CHZ","SYRUP","COMP","RAY","BORG","MON","MANA","NEO","ZK","ZRO","ZBCN","PIPPIN","AR","1INCH","CHEEMS","EIGEN","WAL","IMX","RUNE","EGLD","ZORA","KMNO","WEMIX","W","JTO","AXS","DYDX","SNX","SFP","MET","KAITO","QTUM","GRASS","KSM","AIOZ","LINEA","RON","CORE","MOVE","AXL","AKT","KAVA","BABYDOGE","MINA","BERA","DGB","EOS","H"];async function te(e=20){try{const r=await fetch(`${_e.COINGECKO_MARKETS}?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h,7d`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return(await r.json()).filter(n=>{const s=n.symbol.toUpperCase();return Pt.includes(s)}).slice(0,e).map(n=>({id:n.id,symbol:n.symbol,name:n.name,image:n.image,currentPrice:n.current_price,marketCap:n.market_cap,marketCapRank:n.market_cap_rank,priceChange24h:n.price_change_percentage_24h,priceChange7d:n.price_change_percentage_7d_in_currency,volume24h:n.total_volume,circulatingSupply:n.circulating_supply,totalSupply:n.total_supply,high24h:n.high_24h,low24h:n.low_24h}))}catch(t){throw console.error("Error fetching top tokens:",t),t}}async function Bt(e){try{const t=e.join(","),r=await fetch(`${_e.COINGECKO_PRICE}?ids=${t}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return await r.json()}catch(t){throw console.error("Error fetching token prices:",t),t}}function fe(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0)),r=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59)),a=r.getTime()-e.getTime(),i=Math.floor(a/(1e3*60*60)),n=Math.floor(a%(1e3*60*60)/(1e3*60)),s=Math.floor(a%(1e3*60)/1e3);return{competitionStart:t,competitionEnd:r,timeRemaining:a,timeRemainingFormatted:`${i}h ${n}m ${s}s`,isActive:a>0,startTimestamp:t.getTime(),endTimestamp:r.getTime()}}async function qe(e){try{const t=await te(250),r=e.toLowerCase().trim();return t.filter(i=>{const n=i.name.toLowerCase().includes(r),s=i.symbol.toLowerCase().includes(r);return n||s}).slice(0,20)}catch(t){throw console.error("Error searching tokens:",t),t}}const We=Object.freeze(Object.defineProperty({__proto__:null,fetchTokenPrices:Bt,fetchTopTokens:te,getCompetitionTimeInfo:fe,searchTokens:qe},Symbol.toStringTag,{value:"Module"}));async function zt(e){console.log("Submitting duel prediction:",e);try{if(!C.getState().connected)throw new Error("Wallet not connected");return await Te(),{success:!0,predictionId:Math.floor(Math.random()*1e6),txHash:`0x${Math.random().toString(16).substring(2,66)}`,message:"Prediction submitted successfully!"}}catch(t){throw console.error("Error submitting prediction:",t),t}}async function At(e){const{team:t}=e;console.log("Submitting dream team:",e);try{if(!C.getState().connected)throw new Error("Wallet not connected");if(t.length!==15)throw new Error("Team must have exactly 15 tokens");return await Te(),{success:!0,teamId:Math.floor(Math.random()*1e6),txHash:`0x${Math.random().toString(16).substring(2,66)}`,message:"Team submitted successfully!"}}catch(r){throw console.error("Error submitting team:",r),r}}async function Dt(e){console.log("Submitting candle prediction:",e);try{if(!C.getState().connected)throw new Error("Wallet not connected");return await Te(),{success:!0,predictionId:Math.floor(Math.random()*1e6),txHash:`0x${Math.random().toString(16).substring(2,66)}`,message:"Prediction submitted successfully!"}}catch(t){throw console.error("Error submitting prediction:",t),t}}async function Te(){if(await new Promise(e=>setTimeout(e,1e3+Math.random()*1e3)),Math.random()<.1)throw new Error("Transaction failed: Insufficient gas or user rejected")}const H={BTC:{pair:"BTCUSDT",name:"Bitcoin",image:"https://assets.coingecko.com/coins/images/1/small/bitcoin.png"},ETH:{pair:"ETHUSDT",name:"Ethereum",image:"https://assets.coingecko.com/coins/images/279/small/ethereum.png"},XRP:{pair:"XRPUSDT",name:"XRP",image:"https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png"},BNB:{pair:"BNBUSDT",name:"BNB",image:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png"},SOL:{pair:"SOLUSDT",name:"Solana",image:"https://assets.coingecko.com/coins/images/4128/small/solana.png"},TRX:{pair:"TRXUSDT",name:"TRON",image:"https://assets.coingecko.com/coins/images/1094/small/tron-logo.png"},DOGE:{pair:"DOGEUSDT",name:"Dogecoin",image:"https://assets.coingecko.com/coins/images/5/small/dogecoin.png"},ADA:{pair:"ADAUSDT",name:"Cardano",image:"https://assets.coingecko.com/coins/images/975/small/cardano.png"},LINK:{pair:"LINKUSDT",name:"Chainlink",image:"https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png"},AVAX:{pair:"AVAXUSDT",name:"Avalanche",image:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png"},SUI:{pair:"SUIUSDT",name:"Sui",image:"https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg"},XLM:{pair:"XLMUSDT",name:"Stellar",image:"https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png"},LTC:{pair:"LTCUSDT",name:"Litecoin",image:"https://assets.coingecko.com/coins/images/2/small/litecoin.png"},SHIB:{pair:"SHIBUSDT",name:"Shiba Inu",image:"https://assets.coingecko.com/coins/images/11939/small/shiba.png"},DOT:{pair:"DOTUSDT",name:"Polkadot",image:"https://assets.coingecko.com/coins/images/12171/small/polkadot.png"},UNI:{pair:"UNIUSDT",name:"Uniswap",image:"https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png"},AAVE:{pair:"AAVEUSDT",name:"Aave",image:"https://assets.coingecko.com/coins/images/12645/small/AAVE.png"},NEAR:{pair:"NEARUSDT",name:"NEAR",image:"https://assets.coingecko.com/coins/images/10365/small/near.jpg"},ETC:{pair:"ETCUSDT",name:"Ethereum Classic",image:"https://assets.coingecko.com/coins/images/453/small/ethereum-classic-logo.png"},ICP:{pair:"ICPUSDT",name:"Internet Computer",image:"https://assets.coingecko.com/coins/images/14495/small/Internet_Computer_logo.png"},PEPE:{pair:"PEPEUSDT",name:"Pepe",image:"https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg"},APT:{pair:"APTUSDT",name:"Aptos",image:"https://assets.coingecko.com/coins/images/26455/small/aptos_round.png"},ALGO:{pair:"ALGOUSDT",name:"Algorand",image:"https://assets.coingecko.com/coins/images/4380/small/download.png"},ARB:{pair:"ARBUSDT",name:"Arbitrum",image:"https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg"},VET:{pair:"VETUSDT",name:"VeChain",image:"https://assets.coingecko.com/coins/images/1167/small/VET_Token_Icon.png"},FIL:{pair:"FILUSDT",name:"Filecoin",image:"https://assets.coingecko.com/coins/images/12817/small/filecoin.png"},ATOM:{pair:"ATOMUSDT",name:"Cosmos",image:"https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png"},SEI:{pair:"SEIUSDT",name:"Sei",image:"https://assets.coingecko.com/coins/images/28205/small/Sei_Logo_-_Transparent.png"},CAKE:{pair:"CAKEUSDT",name:"PancakeSwap",image:"https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo.png"},BONK:{pair:"BONKUSDT",name:"Bonk",image:"https://assets.coingecko.com/coins/images/28600/small/bonk.jpg"},OP:{pair:"OPUSDT",name:"Optimism",image:"https://assets.coingecko.com/coins/images/25244/small/Optimism.png"},INJ:{pair:"INJUSDT",name:"Injective",image:"https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png"},STX:{pair:"STXUSDT",name:"Stacks",image:"https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png"},XTZ:{pair:"XTZUSDT",name:"Tezos",image:"https://assets.coingecko.com/coins/images/976/small/Tezos-logo.png"},TIA:{pair:"TIAUSDT",name:"Celestia",image:"https://assets.coingecko.com/coins/images/31967/small/tia.jpg"},GRT:{pair:"GRTUSDT",name:"The Graph",image:"https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png"},ENS:{pair:"ENSUSDT",name:"Ethereum Name Service",image:"https://assets.coingecko.com/coins/images/19785/small/acatxTm8_400x400.jpg"},IOTA:{pair:"IOTAUSDT",name:"IOTA",image:"https://assets.coingecko.com/coins/images/692/small/IOTA_Swirl.png"},PENDLE:{pair:"PENDLEUSDT",name:"Pendle",image:"https://assets.coingecko.com/coins/images/15069/small/Pendle_Logo_Normal-03.png"},PYTH:{pair:"PYTHUSDT",name:"Pyth Network",image:"https://assets.coingecko.com/coins/images/31924/small/pyth.png"},BAT:{pair:"BATUSDT",name:"Basic Attention Token",image:"https://assets.coingecko.com/coins/images/677/small/basic-attention-token.png"},WIF:{pair:"WIFUSDT",name:"dogwifhat",image:"https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg"},SAND:{pair:"SANDUSDT",name:"The Sandbox",image:"https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg"},FLOW:{pair:"FLOWUSDT",name:"Flow",image:"https://assets.coingecko.com/coins/images/13446/small/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png"},JASMY:{pair:"JASMYUSDT",name:"JasmyCoin",image:"https://assets.coingecko.com/coins/images/13876/small/JASMY200x200.jpg"},GALA:{pair:"GALAUSDT",name:"Gala",image:"https://assets.coingecko.com/coins/images/12493/small/GALA-COINGECKO.png"},THETA:{pair:"THETAUSDT",name:"Theta Network",image:"https://assets.coingecko.com/coins/images/2538/small/theta-token-logo.png"},CHZ:{pair:"CHZUSDT",name:"Chiliz",image:"https://assets.coingecko.com/coins/images/8834/small/CHZ_Token_updated.png"},COMP:{pair:"COMPUSDT",name:"Compound",image:"https://assets.coingecko.com/coins/images/10775/small/COMP.png"},MANA:{pair:"MANAUSDT",name:"Decentraland",image:"https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png"},NEO:{pair:"NEOUSDT",name:"Neo",image:"https://assets.coingecko.com/coins/images/480/small/NEO_512_512.png"},ZK:{pair:"ZKUSDT",name:"zkSync",image:"https://assets.coingecko.com/coins/images/38043/small/ZKTokenBlack.png"},ZRO:{pair:"ZROUSDT",name:"LayerZero",image:"https://assets.coingecko.com/coins/images/28206/small/ftxG9_TJ_400x400.jpeg"},AR:{pair:"ARUSDT",name:"Arweave",image:"https://assets.coingecko.com/coins/images/4343/small/oRt6SiEN_400x400.jpg"},"1INCH":{pair:"1INCHUSDT",name:"1inch",image:"https://assets.coingecko.com/coins/images/13469/small/1inch-token.png"},IMX:{pair:"IMXUSDT",name:"Immutable",image:"https://assets.coingecko.com/coins/images/17233/small/immutableX-symbol-BLK-RGB.png"},RUNE:{pair:"RUNEUSDT",name:"THORChain",image:"https://assets.coingecko.com/coins/images/6595/small/Rune200x200.png"},EGLD:{pair:"EGLDUSDT",name:"MultiversX",image:"https://assets.coingecko.com/coins/images/12335/small/egld-token-logo.png"},AXS:{pair:"AXSUSDT",name:"Axie Infinity",image:"https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png"},DYDX:{pair:"DYDXUSDT",name:"dYdX",image:"https://assets.coingecko.com/coins/images/17500/small/hjnIm9bV.jpg"},SNX:{pair:"SNXUSDT",name:"Synthetix",image:"https://assets.coingecko.com/coins/images/3406/small/SNX.png"},QTUM:{pair:"QTUMUSDT",name:"Qtum",image:"https://assets.coingecko.com/coins/images/684/small/Qtum_Logo_blue_CG.png"},KSM:{pair:"KSMUSDT",name:"Kusama",image:"https://assets.coingecko.com/coins/images/9568/small/m4zRhP5e_400x400.jpg"},RON:{pair:"RONUSDT",name:"Ronin",image:"https://assets.coingecko.com/coins/images/20009/small/ronin.jpg"},AXL:{pair:"AXLUSDT",name:"Axelar",image:"https://assets.coingecko.com/coins/images/27277/small/V-65_xQ1_400x400.jpeg"},KAVA:{pair:"KAVAUSDT",name:"Kava",image:"https://assets.coingecko.com/coins/images/9761/small/kava.png"},MINA:{pair:"MINAUSDT",name:"Mina Protocol",image:"https://assets.coingecko.com/coins/images/15628/small/JM4_vQ34_400x400.png"},EOS:{pair:"EOSUSDT",name:"EOS",image:"https://assets.coingecko.com/coins/images/738/small/eos-eos-logo.png"},FLOKI:{pair:"FLOKIUSDT",name:"FLOKI",image:"https://assets.coingecko.com/coins/images/16746/small/PNG_image.png"},WLD:{pair:"WLDUSDT",name:"Worldcoin",image:"https://assets.coingecko.com/coins/images/31069/small/worldcoin.jpeg"},STRK:{pair:"STRKUSDT",name:"Starknet",image:"https://assets.coingecko.com/coins/images/26433/small/starknet.png"},RENDER:{pair:"RENDERUSDT",name:"Render",image:"https://assets.coingecko.com/coins/images/11636/small/rndr.png"},JTO:{pair:"JTOUSDT",name:"Jito",image:"https://assets.coingecko.com/coins/images/33228/small/jto.png"},JUP:{pair:"JUPUSDT",name:"Jupiter",image:"https://assets.coingecko.com/coins/images/34188/small/jup.png"},BERA:{pair:"BERAUSDT",name:"Berachain",image:"https://assets.coingecko.com/coins/images/36017/small/bera.png"},MOVE:{pair:"MOVEUSDT",name:"Movement",image:"https://assets.coingecko.com/coins/images/37160/small/move.jpg"}};let M=new Map;async function Ve(e,t="1m",r=50){const a=H[e];if(!a)throw new Error(`Token ${e} not supported on Binance`);const i=`https://api.binance.com/api/v3/klines?symbol=${a.pair}&interval=${t}&limit=${r}`;try{const n=await fetch(i);if(!n.ok)throw new Error(`Binance API error: ${n.status}`);return(await n.json()).map(o=>({openTime:o[0],open:parseFloat(o[1]),high:parseFloat(o[2]),low:parseFloat(o[3]),close:parseFloat(o[4]),volume:parseFloat(o[5]),closeTime:o[6],isGreen:parseFloat(o[4])>=parseFloat(o[1]),isClosed:!0}))}catch(n){throw console.error(`Error fetching candles for ${e}:`,n),n}}function Ye(e,t,r){const a=H[e];if(!a)return console.error(`Token ${e} not supported on Binance`),()=>{};const i=`${a.pair.toLowerCase()}@kline_${t}`,n=`${e}_${t}`;if(M.has(n))return M.get(n).callbacks.add(r),()=>{if(M.has(n)){const b=M.get(n);b.callbacks.delete(r),b.callbacks.size===0&&(b.close(),M.delete(n))}};const s=new Set([r]),o=`wss://stream.binance.com:9443/ws/${i}`;let l,c=!0,d,m=0;const h=()=>{c=!1,d&&clearTimeout(d),l&&(l.onclose=null,l.close())};function p(){c&&(l=new WebSocket(o),l.onopen=()=>{console.log(`WebSocket connected: ${e} ${t}`),m=0},l.onmessage=g=>{try{const f=JSON.parse(g.data).k,y={openTime:f.t,open:parseFloat(f.o),high:parseFloat(f.h),low:parseFloat(f.l),close:parseFloat(f.c),volume:parseFloat(f.v),closeTime:f.T,isGreen:parseFloat(f.c)>=parseFloat(f.o),isClosed:f.x,symbol:e,interval:t};s.forEach(w=>{try{w(y)}catch(T){console.error("Error in candle callback:",T)}})}catch(b){console.error("Error parsing candle data:",b)}},l.onerror=g=>{},l.onclose=()=>{if(c){m++;const g=Math.min(1e3*Math.pow(1.5,m),3e4);console.log(`WebSocket closed for ${e} ${t}, reconnecting in ${g}ms...`),d=setTimeout(p,g)}})}return p(),M.set(n,{callbacks:s,close:h}),()=>{if(M.has(n)){const g=M.get(n);g.callbacks.delete(r),g.callbacks.size===0&&(g.close(),M.delete(n))}}}function Xe(e){const t=H[e];return t?{id:e.toLowerCase(),symbol:e,name:t.name,image:t.image,pair:t.pair}:null}function Ke(e=12){return["BTC","ETH","SOL","XRP","DOGE","PEPE","BNB","ADA","AVAX","LINK","DOT","SHIB"].slice(0,e).map(a=>Xe(a)).filter(Boolean)}function me(e,t){const r=H[e];if(!r)return console.error(`Token ${e} not supported on Binance`),()=>{};const a=`${r.pair.toLowerCase()}@ticker`,i=`ticker_${e}`;if(M.has(i))return M.get(i).callbacks.add(t),()=>{if(M.has(i)){const g=M.get(i);g.callbacks.delete(t),g.callbacks.size===0&&(g.close(),M.delete(i))}};const n=new Set([t]),s=`wss://stream.binance.com:9443/ws/${a}`;let o,l=!0,c,d=0;const m=()=>{l=!1,c&&clearTimeout(c),o&&(o.onclose=null,o.close())};function h(){l&&(o=new WebSocket(s),o.onopen=()=>{console.log(`Ticker WebSocket connected: ${e}`),d=0},o.onmessage=p=>{try{const g=JSON.parse(p.data),b={symbol:e,price:parseFloat(g.c),priceChange24h:parseFloat(g.P),high24h:parseFloat(g.h),low24h:parseFloat(g.l),volume24h:parseFloat(g.v),lastUpdate:Date.now()};n.forEach(f=>{try{f(b)}catch(y){console.error("Error in ticker callback:",y)}})}catch(g){console.error("Error parsing ticker data:",g)}},o.onerror=p=>{},o.onclose=()=>{if(l){d++;const p=Math.min(1e3*Math.pow(1.5,d),3e4);console.log(`Ticker WebSocket closed for ${e}, reconnecting in ${p}ms...`),c=setTimeout(h,p)}})}return h(),M.set(i,{callbacks:n,close:m}),()=>{if(M.has(i)){const p=M.get(i);p.callbacks.delete(t),p.callbacks.size===0&&(p.close(),M.delete(i))}}}async function Ee(e){const t=H[e];if(!t)throw new Error(`Token ${e} not supported on Binance`);const r=`https://api.binance.com/api/v3/ticker/24hr?symbol=${t.pair}`;try{const a=await fetch(r);if(!a.ok)throw new Error(`Binance API error: ${a.status}`);const i=await a.json();return{symbol:e,name:t.name,image:t.image,price:parseFloat(i.lastPrice),priceChange24h:parseFloat(i.priceChangePercent),high24h:parseFloat(i.highPrice),low24h:parseFloat(i.lowPrice),volume24h:parseFloat(i.volume)}}catch(a){throw console.error(`Error fetching ticker for ${e}:`,a),a}}async function _(e){try{const t=await fetch("https://api.binance.com/api/v3/ticker/24hr");if(!t.ok)throw new Error(`Binance API error: ${t.status}`);const r=await t.json(),a=new Map;return r.forEach(n=>{a.set(n.symbol,n)}),e.filter(n=>H[n]).map(n=>{const s=H[n],o=a.get(s.pair);return o?{symbol:n,name:s.name,image:s.image,price:parseFloat(o.lastPrice),priceChange24h:parseFloat(o.priceChangePercent),high24h:parseFloat(o.highPrice),low24h:parseFloat(o.lowPrice),volume24h:parseFloat(o.volume)}:null}).filter(Boolean)}catch(t){return console.error("Error fetching multiple tickers:",t),[]}}const Ce=Object.freeze(Object.defineProperty({__proto__:null,BINANCE_TOKENS:H,fetchHistoricalCandles:Ve,fetchMultipleTickers:_,fetchTickerData:Ee,getAvailableTokens:Ke,getTokenDisplayData:Xe,subscribeToCandleUpdates:Ye,subscribeToTickerUpdates:me},Symbol.toStringTag,{value:"Module"}));let ve=[];function Ft(){v={a:null,b:null};const e=document.createElement("div");e.className="crypto-duel-page",e.style.cssText=`
    display: flex;
    align-items: stretch;
    height: calc(100vh - 64px);
    overflow: hidden;
  `;const t=document.createElement("div");t.id="duel-main-content",t.style.cssText=`
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-xl) var(--spacing-lg);
    transition: margin-right 0.3s ease;
  `;const r=document.createElement("div");r.style.cssText="margin-bottom: var(--spacing-xl); text-align: center;",r.innerHTML=`
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vs-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
        </defs>
        <!-- Outer circle with gradient -->
        <circle cx="32" cy="32" r="28" fill="url(#vs-grad-page)"/>
        <!-- Inner circle -->
        <circle cx="32" cy="32" r="22" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/>
        <!-- VS Text -->
        <text x="32" y="40" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="bold" font-family="Arial, sans-serif">VS</text>
      </svg>
      Crypto Duel
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1.125rem;">
      Select two cryptocurrencies and predict which one will outperform the other
    </p>
  `,t.appendChild(r);const a=document.createElement("div");a.id="token-grid",a.className="grid grid-auto",a.style.marginBottom="var(--spacing-xl)",t.appendChild(a);const i=document.createElement("div");return i.id="selection-panel",i.style.cssText=`
    position: fixed;
    top: 64px;
    right: 0;
    width: 320px;
    height: calc(100vh - 64px);
    background: var(--glass-bg);
    border-left: 1px solid var(--glass-border);
    padding: var(--spacing-md);
    display: none;
    flex-direction: column;
    overflow-y: auto;
    z-index: 100;
  `,e.appendChild(t),e.appendChild(i),Nt(a,i),e}let v={a:null,b:null},q=1;async function Nt(e,t){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>',ve.forEach(r=>r()),ve=[];try{const a=await _(["BTC","ETH","SOL","XRP","DOGE","PEPE","BNB","ADA","AVAX","LINK","DOT","SHIB","LTC","UNI","NEAR","ATOM","ARB","OP","SUI","APT"]);if(a.length>0){const i=a.map(n=>({id:n.symbol.toLowerCase(),symbol:n.symbol,name:n.name,image:n.image,currentPrice:n.price,priceChange24h:n.priceChange24h}));Ae(i,e,t),a.forEach(n=>{const s=me(n.symbol,o=>{It(e,o.symbol.toLowerCase(),o.price,o.priceChange24h)});ve.push(s)}),console.log("🟢 Loaded tokens from Binance with real-time updates")}else throw new Error("No Binance tokens loaded")}catch(r){console.log("Falling back to CoinGecko:",r.message);try{const a=await te(20);Ae(a,e,t)}catch{e.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
          Failed to load tokens. Please try again later.
        </div>
      `}}}function It(e,t,r,a){const i=e.querySelector(`.token-card[data-token-id="${t}"]`);if(!i)return;const n=i.querySelector(".token-price-value"),s=i.querySelector(".token-price-change");if(n){const o=n.dataset.price||0;n.textContent=S(r),n.dataset.price=r,parseFloat(o)!==r&&(n.style.transition="color 0.3s",n.style.color=r>parseFloat(o)?"#09C285":"#FF4D4F",setTimeout(()=>{n.style.color=""},500))}s&&(s.textContent=U(a),s.className=`token-price-change ${R(a)}`)}function Ot(){const e="duel-tracker-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
        .duel-tracker-card {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            min-width: 200px;
            
            padding: 12px 20px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            animation: fadeIn 0.3s ease-out;
        }

        .duel-tracker-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            border-color: var(--color-primary);
            background: rgba(15, 23, 42, 0.9);
        }

        /* Pulse animation class */
        .duel-tracker-card.pulse {
            animation: duelPulse 2s infinite;
        }

        @keyframes duelPulse {
          0% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          50% {
            box-shadow: 0 4px 25px rgba(9, 194, 133, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
        }
    `,document.head.appendChild(t)}function Ae(e,t,r){t.innerHTML="",e.forEach(a=>{const i=Ht(a);i.addEventListener("click",()=>Ut(a,t,r)),t.appendChild(i)})}function Ht(e){const t=document.createElement("div");t.className="token-card",t.dataset.tokenId=e.id;const r=R(e.priceChange24h);return t.innerHTML=`
    <div class="token-icon">
      <img src="${e.image}" alt="${e.name}" />
    </div>
    <div class="token-info">
      <div class="token-name">${e.name}</div>
      <div class="token-symbol">${e.symbol.toUpperCase()}</div>
    </div>
    <div class="token-price">
      <div class="token-price-value">${S(e.currentPrice)}</div>
      <div class="token-price-change ${r}">
        ${U(e.priceChange24h)}
      </div>
    </div>
  `,t}function Ut(e,t,r){var a,i;if(((a=v.a)==null?void 0:a.id)===e.id){v.a=null,V(t),Y(r);return}if(((i=v.b)==null?void 0:i.id)===e.id){v.b=null,V(t),Y(r);return}v.a?(v.b&&(v.a=v.b),v.b=e):v.a=e,V(t),Y(r)}function V(e){e.querySelectorAll(".token-card").forEach(r=>{var i,n;const a=r.dataset.tokenId;a===((i=v.a)==null?void 0:i.id)||a===((n=v.b)==null?void 0:n.id)?r.classList.add("selected"):r.classList.remove("selected")})}function Y(e){const t=(v.a?1:0)+(v.b?1:0),r=document.getElementById("duel-main-content"),a=document.getElementById("token-grid"),i=document.querySelectorAll("#token-grid .token-card");if(t===0){e.style.display="none",r&&(r.style.marginRight="0"),a&&a.classList.remove("compact-grid"),i.forEach(l=>l.classList.remove("compact-mode"));return}r&&(r.style.marginRight="320px"),a&&a.classList.add("compact-grid"),i.forEach(l=>l.classList.add("compact-mode")),e.style.cssText=`
    position: fixed;
    top: 64px;
    right: 0;
    width: 320px;
    height: calc(100vh - 64px);
    background: var(--glass-bg);
    border-left: 1px solid var(--glass-border);
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--spacing-md);
    overflow-y: auto;
    z-index: 100;
    /* Hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    animation: slideInRight 0.3s ease-out;
  `,e.innerHTML=`
    <!-- Top Content -->
    <div>
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--spacing-sm); border-bottom: 1px solid var(--glass-border); margin-bottom: var(--spacing-md);">
        <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span style="font-weight: 600; font-size: 1.1rem;">Duel Slip</span>
          <span style="background: var(--color-primary); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;">${t}</span>
        </div>
        <button id="close-panel-btn" style="background: none; border: none; cursor: pointer; padding: 2px; color: var(--color-text-muted);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Duel Card -->
      <div style="background: var(--color-bg-secondary); border-radius: var(--radius-lg); padding: var(--spacing-md); border: 1px solid var(--glass-border);">
        <!-- Match Title -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-sm); border-bottom: 1px solid var(--glass-border);">
          <div style="font-size: 0.85rem; font-weight: 500; color: var(--color-text-primary); flex: 1;">
            ${v.a?v.a.symbol.toUpperCase():"???"} vs ${v.b?v.b.symbol.toUpperCase():"???"}
          </div>
          <button class="remove-selection-btn" style="background: none; border: none; cursor: pointer; padding: 2px; color: var(--color-text-muted); font-size: 1rem;">×</button>
        </div>
        
        <!-- Tokens Display -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
          ${le(v.a,"A")}
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent-orange); padding: 0 var(--spacing-xs);">VS</div>
          ${le(v.b,"B")}
        </div>

        <!-- Live Performance Comparison -->
        <!-- 24h Performance Comparison (Simplified) -->
        ${v.a&&v.b?`
        <div style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
             ${(()=>{const l=v.a.priceChange24h||0,c=v.b.priceChange24h||0,d=Math.abs(l-c).toFixed(2);return l>c?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;"><b>${v.a.symbol.toUpperCase()}</b> currently leads <b>${v.b.symbol.toUpperCase()}</b> by <b style="color: #09C285">${d}%</b></span>`:c>l?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;"><b>${v.b.symbol.toUpperCase()}</b> currently leads <b>${v.a.symbol.toUpperCase()}</b> by <b style="color: #09C285">${d}%</b></span>`:'<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance in last 24H</span>'})()}
        </div>
        `:""}

        <!-- Time Period Selection -->
        <div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Duration</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
            ${Object.entries(O).map(([l,c])=>`
              <button class="time-option ${c.hours===q?"selected":""}" data-hours="${c.hours}" style="padding: 0.4rem 0.5rem; font-size: 0.8rem;">
                ${c.label}
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    </div>

<!-- Bottom Section (Centered) -->
<div style="border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md); text-align: center;">
  <div style="margin-bottom: var(--spacing-xs);">
    <div style="color: var(--color-text-muted); font-size: 0.85rem;">Selected Tokens</div>
    <div style="font-weight: 600; font-size: 0.85rem;">${t}/2</div>
  </div>
  <div style="margin-bottom: var(--spacing-md);">
    <div style="color: var(--color-text-muted); font-size: 0.85rem;">Duration</div>
    <div style="font-weight: 600; font-size: 0.85rem; color: var(--color-primary);">
      ${(()=>{const l=Object.keys(O).find(c=>Math.abs(O[c].hours-q)<.001);return l?O[l].label:"1H"})()}
    </div>
  </div>
  <button class="btn btn-primary" style="width: 100%; padding: 0.875rem;" id="start-duel-btn" ${t<2?"disabled":""}>
    ${t<2?"Select 2 Tokens":"Start Duel"}
  </button>
</div>
  `,e.querySelectorAll(".time-option").forEach(l=>{l.addEventListener("click",()=>{q=parseFloat(l.dataset.hours),Y(e)})});const n=e.querySelector("#close-panel-btn");n&&n.addEventListener("click",()=>{v={a:null,b:null};const l=document.getElementById("token-grid"),c=document.getElementById("duel-main-content"),d=document.querySelectorAll("#token-grid .token-card");l&&(V(l),l.classList.remove("compact-grid")),c&&(c.style.marginRight="0"),d.forEach(m=>m.classList.remove("compact-mode")),e.style.display="none"});const s=e.querySelector(".remove-selection-btn");s&&s.addEventListener("click",()=>{v={a:null,b:null};const l=document.getElementById("token-grid");l&&V(l),Y(e)});const o=e.querySelector("#start-duel-btn");o&&(o.onclick=()=>{o.disabled||Rt()})}function le(e,t,r=null){if(!e)return`
      <div style="display: flex; align-items: center; gap: var(--spacing-xs); flex: 1;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: var(--color-text-muted);">?</div>
        <div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">Token ${t}</div>
          <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted);">Select</div>
        </div>
      </div>
    `;const a=S(e.currentPrice);let i="0.75rem";return a.length>10?i="0.6rem":a.length>8?i="0.65rem":a.length>6&&(i="0.7rem"),`
    <div style="display: flex; align-items: center; gap: var(--spacing-xs); flex: 1; min-width: 0; overflow: hidden;">
      <img src="${e.image}" alt="${e.symbol}" style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;" />
      <div style="min-width: 0; overflow: hidden;">
        <div style="font-size: 0.7rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${e.name.length>8?e.symbol.toUpperCase():e.name}</div>
        <div ${r?`id="${r}"`:""} style="font-size: ${i}; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${a}</div>
      </div>
    </div>
  `}function Rt(){if(!C.getState().connected){alert("Please connect your wallet first!");return}const t=document.createElement("div");t.className="modal-overlay";const r=document.createElement("div");r.className="modal",r.style.maxWidth="500px",r.innerHTML=`
    <button class="modal-close">×</button>
    <h2 class="modal-title">Make Your Prediction</h2>
    
    <div class="modal-body">
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
        Which token will perform better in the next ${(()=>{const a=Object.keys(O).find(i=>Math.abs(O[i].hours-q)<.001);return a?O[a].label.toLowerCase():"1h"})()}?
      </p>

      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        <button class="btn btn-success btn-lg" id="predict-a">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          ${v.a.name} will outperform ${v.b.name}
        </button>
        
        <button class="btn btn-success btn-lg" id="predict-b">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          ${v.b.name} will outperform ${v.a.name}
        </button>
      </div>
    </div>
  `,t.appendChild(r),document.body.appendChild(t),r.querySelector(".modal-close").addEventListener("click",()=>t.remove()),t.addEventListener("click",a=>{a.target===t&&t.remove()}),r.querySelector("#predict-a").addEventListener("click",()=>De("A",t)),r.querySelector("#predict-b").addEventListener("click",()=>De("B",t))}let be=[];async function De(e,t){var a,i;const r=t.querySelector(e==="A"?"#predict-a":"#predict-b");r.disabled=!0,r.innerHTML='<div class="loading"></div> Fetching prices...';try{let n,s;try{const{fetchTickerData:f}=await J(async()=>{const{fetchTickerData:T}=await Promise.resolve().then(()=>Ce);return{fetchTickerData:T}},void 0),[y,w]=await Promise.all([f(v.a.symbol.toUpperCase()),f(v.b.symbol.toUpperCase())]);n=y.price,s=w.price,console.log("🟢 Got starting prices from Binance")}catch{console.log("Falling back to CoinGecko for starting prices");const{fetchTokenPrices:y}=await J(async()=>{const{fetchTokenPrices:T}=await Promise.resolve().then(()=>We);return{fetchTokenPrices:T}},void 0),w=await y([v.a.id,v.b.id]);n=((a=w[v.a.id])==null?void 0:a.usd)||v.a.currentPrice,s=((i=w[v.b.id])==null?void 0:i.usd)||v.b.currentPrice}console.log(`[Duel Start] ${v.a.symbol}: $${n}`),console.log(`[Duel Start] ${v.b.symbol}: $${s}`),r.innerHTML='<div class="loading"></div> Submitting...';const o=e,l=q,c=l*60*60*1e3,d=await zt({tokenA:v.a.id,tokenB:v.b.id,predictedWinner:e,duration:q});t.remove();const m=document.getElementById("selection-panel"),h=document.getElementById("duel-main-content"),p=document.getElementById("token-grid"),g=document.querySelectorAll("#token-grid .token-card");m&&(m.style.display="none"),h&&(h.style.marginRight="0"),p&&p.classList.remove("compact-grid"),g.forEach(f=>{f.classList.remove("compact-mode","selected")});const b={id:d.predictionId,tokenA:{...v.a,startPrice:n},tokenB:{...v.b,startPrice:s},predictedWinner:o,duration:l,startTime:Date.now()};be.push(b),_t(b,c),v={a:null,b:null}}catch(n){r.disabled=!1,r.innerHTML=e==="A"?`${v.a.name} will win`:`${v.b.name} will win`,alert(`❌ Error: ${n.message}`)}}async function _t(e,t){let r=!0,a=e.tokenA.startPrice,i=e.tokenB.startPrice,n=null,s=null;const o=document.createElement("div");o.id=`duel-countdown-${e.id}`;const l=()=>{o.className="",o.style.cssText="margin-top: auto; border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md);"},c=()=>{Ot(),o.className="duel-tracker-card pulse",o.style.cssText=""},d=u=>u>=1e3?"$"+u.toLocaleString("en-US",{maximumFractionDigits:2}):u>=1?"$"+u.toFixed(2):"$"+u.toFixed(6),m=(u,x)=>(u-x)/x*100,h=async()=>{try{const{subscribeToTickerUpdates:u}=await J(async()=>{const{subscribeToTickerUpdates:x}=await Promise.resolve().then(()=>Ce);return{subscribeToTickerUpdates:x}},void 0);n=u(e.tokenA.symbol.toUpperCase(),x=>{a=x.price}),s=u(e.tokenB.symbol.toUpperCase(),x=>{i=x.price}),console.log("🔴 Started live price tracking for duel")}catch(u){console.log("Could not start ticker updates:",u)}},p=()=>{n&&n(),s&&s(),console.log("⬛ Stopped live price tracking for duel")},g=u=>{const x=Math.ceil(u/1e3),k=Math.floor(x/60),P=x%60,ue=k>0?`${k}:${P.toString().padStart(2,"0")}`:`${x}s`,z=m(a,e.tokenA.startPrice),A=m(i,e.tokenB.startPrice),ie=z>=A?e.tokenA.symbol:e.tokenB.symbol;o.innerHTML=`
      <div class="loading" style="width: 14px; height: 14px; border-color: white; border-top-color: transparent;"></div>
      <span style="color: white; font-weight: 600; font-size: 0.85rem;">${ie} 🏆</span>
      <span style="color: rgba(255,255,255,0.8); font-weight: 700; font-size: 0.9rem;">${ue}</span>
    `},b=u=>{const x=Math.ceil(u/1e3),k=Math.floor(x/60),P=x%60,ue=k>0?`${k}m ${P}s`:`${x}s`,z=m(a,e.tokenA.startPrice),A=m(i,e.tokenB.startPrice),ie=z>A,dt=A>z,Le=Math.abs(z-A)<.001,Pe=document.getElementById("live-price-a");Pe&&(Pe.textContent=d(a));const Be=document.getElementById("live-price-b");Be&&(Be.textContent=d(i));const ne=document.getElementById("live-perf-summary");if(ne){const ze=Math.abs(z-A).toFixed(3);ie?ne.innerHTML=`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenA.symbol.toUpperCase()}</b> is leading <b>${e.tokenB.symbol.toUpperCase()}</b> by <b style="color: #09C285">${ze}%</b></span>`:dt?ne.innerHTML=`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenB.symbol.toUpperCase()}</b> is leading <b>${e.tokenA.symbol.toUpperCase()}</b> by <b style="color: #09C285">${ze}%</b></span>`:ne.innerHTML='<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance since start</span>'}o.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-sm);">
        <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
          <div class="loading" style="width: 12px; height: 12px;"></div>
          <span style="font-weight: 600; font-size: 0.85rem; color: var(--color-primary);">LIVE DUEL</span>
        </div>
        <span style="font-weight: 700; font-size: 0.9rem; color: var(--color-text-primary);">${ue}</span>
      </div>
      
      <!-- Live Status -->
      <div style="background: rgba(9, 194, 133, 0.1); border: 1px solid rgba(9, 194, 133, 0.3); border-radius: var(--radius-md); padding: var(--spacing-sm); text-align: center;">
         <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 2px;">
            ${Le?"⚖️ Currently Tied":ie?`🏆 ${e.tokenA.symbol} LEADING`:`🏆 ${e.tokenB.symbol} LEADING`}
         </div>
         <div style="font-size: 0.75rem; color: var(--color-text-muted);">
            ${Le?"Both tokens have equal performance":`Leading by ${Math.abs(z-A).toFixed(3)}%`}
         </div>
         <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.75rem;">
            <span style="color: ${z>=0?"#09C285":"#FF4D4F"}">${e.tokenA.symbol}: ${z>=0?"+":""}${z.toFixed(3)}%</span>
            <span style="color: ${A>=0?"#09C285":"#FF4D4F"}">${e.tokenB.symbol}: ${A>=0?"+":""}${A.toFixed(3)}%</span>
         </div>
      </div>
      
      <button class="btn" style="width: 100%; margin-top: var(--spacing-md); background: var(--color-bg-tertiary); color: var(--color-text-muted); opacity: 0.7; cursor: not-allowed;">
        Duel in Progress...
      </button>
    `},f=()=>{var u;return`
      <!-- Top Content -->
      <div>
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--spacing-md); border-bottom: 1px solid var(--glass-border); margin-bottom: var(--spacing-md);">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span style="font-weight: 600; font-size: 1.1rem;">Duel Slip</span>
            <span style="background: var(--color-primary); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;">2</span>
          </div>
          <button id="close-panel-btn-disabled" style="background: none; border: none; cursor: default; padding: 4px; color: var(--color-text-muted); opacity: 0.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Duel Card -->
        <div style="background: var(--color-bg-secondary); border-radius: var(--radius-lg); padding: var(--spacing-md); border: 1px solid var(--glass-border);">
          <!-- Match Title -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-sm); border-bottom: 1px solid var(--glass-border);">
            <div style="font-size: 0.85rem; font-weight: 500; color: var(--color-text-primary); flex: 1;">
              ${e.tokenA.symbol.toUpperCase()} vs ${e.tokenB.symbol.toUpperCase()}
            </div>
          </div>
          
          <!-- Tokens Display -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
            ${le(e.tokenA,"A","live-price-a")}
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent-orange); padding: 0 var(--spacing-xs);">VS</div>
            ${le(e.tokenB,"B","live-price-b")}
          </div>

          <!-- 24h Performance Comparison (Simplified Static Context) -->
          <div id="live-perf-summary" style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
             ${(()=>{const x=e.tokenA.priceChange24h||0,k=e.tokenB.priceChange24h||0,P=Math.abs(x-k).toFixed(2);return x>k?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenA.symbol.toUpperCase()}</b> is leading <b>${e.tokenB.symbol.toUpperCase()}</b> by <b style="color: #09C285">${P}%</b></span>`:k>x?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenB.symbol.toUpperCase()}</b> is leading <b>${e.tokenA.symbol.toUpperCase()}</b> by <b style="color: #09C285">${P}%</b></span>`:'<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance in last 24H</span>'})()}
          </div>

          <!-- Time Period Selection -->
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Duration</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
               <div style="padding: 0.4rem 0.5rem; font-size: 0.8rem; background: var(--gradient-green); border-radius: var(--radius-md); text-align: center; font-weight: 600; border: 1px solid transparent;">
                  ${((u=Object.values(O).find(x=>Math.abs(x.hours-e.duration)<.001))==null?void 0:u.label)||"1H"}
               </div>
            </div>
          </div>
        </div>
      </div>
    `},y=()=>{const x=window.location.hash.replace("#","").replace("/","")==="crypto-duel",k=document.getElementById("selection-panel");if(x&&k){if(!r||o.parentElement!==k){r=!0,o.parentElement===document.body&&document.body.removeChild(o),k.style.display="flex";const P=document.getElementById("duel-main-content");P&&(P.style.marginRight="320px"),k.innerHTML=f(),l(),k.appendChild(o),b(w)}}else if(r||o.parentElement!==document.body){if(r=!1,o.parentElement){o.parentElement.removeChild(o);const P=document.getElementById("selection-panel");P&&(P.style.display="none")}c(),document.body.appendChild(o),g(w)}};o.addEventListener("click",()=>{r||(window.location.hash="#/crypto-duel")}),window.addEventListener("hashchange",y),window.addEventListener("navigate",y),h();let w=t;y();const T=setInterval(()=>{w-=1e3,w<=0?(clearInterval(T),p(),window.removeEventListener("hashchange",y),window.removeEventListener("navigate",y),o.parentElement!==document.body&&(o.parentElement&&o.parentElement.removeChild(o),o.style.cssText=`
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--spacing-lg);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          min-width: 300px;
          backdrop-filter: blur(10px);
        `,document.body.appendChild(o)),jt(e,o)):r?b(w):g(w)},1e3)}async function jt(e,t){var r,a;t.innerHTML=`
    <div style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm);">
      <div class="loading" style="width: 20px; height: 20px;"></div>
      <span>Calculating results...</span>
    </div>
  `;try{let i,n;try{const{fetchTickerData:d}=await J(async()=>{const{fetchTickerData:p}=await Promise.resolve().then(()=>Ce);return{fetchTickerData:p}},void 0),[m,h]=await Promise.all([d(e.tokenA.symbol.toUpperCase()),d(e.tokenB.symbol.toUpperCase())]);i=m.price,n=h.price,console.log("🟢 Got final prices from Binance")}catch{console.log("Falling back to CoinGecko for final prices");const{fetchTokenPrices:m}=await J(async()=>{const{fetchTokenPrices:p}=await Promise.resolve().then(()=>We);return{fetchTokenPrices:p}},void 0),h=await m([e.tokenA.id,e.tokenB.id]);i=((r=h[e.tokenA.id])==null?void 0:r.usd)||e.tokenA.startPrice,n=((a=h[e.tokenB.id])==null?void 0:a.usd)||e.tokenB.startPrice}const s=(i-e.tokenA.startPrice)/e.tokenA.startPrice*100,o=(n-e.tokenB.startPrice)/e.tokenB.startPrice*100;let l;Math.abs(s-o)<.001?l="TIE":l=s>o?"A":"B";const c=l==="TIE"?null:e.predictedWinner===l;Gt(e,t,{changeA:s,changeB:o,actualWinner:l,userWon:c,endPriceA:i,endPriceB:n}),be=be.filter(d=>d.id!==e.id)}catch(i){console.error("Error determining winner:",i),t.innerHTML=`
      <div style="color: var(--color-danger); text-align: center; padding: var(--spacing-md);">
        ❌ Error fetching results
        <button onclick="this.parentElement.parentElement.remove()" style="display: block; margin: var(--spacing-sm) auto 0; padding: 0.5rem 1rem; cursor: pointer;">Dismiss</button>
      </div>
    `}}function Gt(e,t,r){const a=r.actualWinner==="A"?e.tokenA:e.tokenB;r.actualWinner==="A"?e.tokenB:e.tokenA;const i=document.getElementById("selection-panel");i&&i.contains(t)?(t.style.cssText=`
      width: 100%;
      max-width: 300px;
      margin: 0 auto var(--spacing-md) auto;
      padding: 0;
      align-self: center;
    `,i.style.paddingBottom="0",i.style.justifyContent="flex-start"):t.style.cssText=`
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-xl);
      padding: var(--spacing-lg);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      min-width: 300px;
      backdrop-filter: blur(10px);
    `,t.innerHTML=`
    <div style="text-align: center; animation: fadeIn 0.4s ease-out;">
      <div style="font-size: 3rem; margin-bottom: var(--spacing-sm);">
        ${r.userWon===null?"🤝":r.userWon?"🎉":"😔"}
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-md); color: ${r.userWon===null?"var(--color-warning)":r.userWon?"var(--color-success)":"var(--color-danger)"};">
        ${r.userWon===null?"It's a Tie!":r.userWon?"You Won!":"You Lost"}
      </div>
      <!-- Token A Results -->
      <div style="background: var(--color-bg-secondary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-xs); ${r.actualWinner==="A"?"border: 2px solid var(--color-success);":""}">
        <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-xs);">
          <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
            <img src="${e.tokenA.image}" style="width: 24px; height: 24px; border-radius: 50%;" />
            <span style="font-weight: 600;">${e.tokenA.symbol.toUpperCase()}</span>
            ${r.actualWinner==="A"?'<span style="font-size: 0.7rem; background: var(--color-success); color: white; padding: 1px 6px; border-radius: 4px; margin-left: 4px;">WINNER</span>':""}
          </div>
          <span style="color: ${r.changeA>=0?"var(--color-success)":"var(--color-danger)"}; font-weight: 700; font-size: 1.1rem; white-space: nowrap;">
            ${r.changeA>=0?"+":""}${r.changeA.toFixed(3)}%
          </span>
        </div>
        <div style="display: flex; gap: var(--spacing-md); font-size: 0.75rem; color: var(--color-text-muted);">
          <span>Start: $${e.tokenA.startPrice.toLocaleString("en-US",{maximumFractionDigits:6})}</span>
          <span>End: $${r.endPriceA.toLocaleString("en-US",{maximumFractionDigits:6})}</span>
        </div>
      </div>
      <!-- Token B Results -->
      <div style="background: var(--color-bg-secondary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); ${r.actualWinner==="B"?"border: 2px solid var(--color-success);":""}">
        <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-xs);">
          <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
            <img src="${e.tokenB.image}" style="width: 24px; height: 24px; border-radius: 50%;" />
            <span style="font-weight: 600;">${e.tokenB.symbol.toUpperCase()}</span>
            ${r.actualWinner==="B"?'<span style="font-size: 0.7rem; background: var(--color-success); color: white; padding: 1px 6px; border-radius: 4px; margin-left: 4px;">WINNER</span>':""}
          </div>
          <span style="color: ${r.changeB>=0?"var(--color-success)":"var(--color-danger)"}; font-weight: 700; font-size: 1.1rem; white-space: nowrap;">
            ${r.changeB>=0?"+":""}${r.changeB.toFixed(3)}%
          </span>
        </div>
        <div style="display: flex; gap: var(--spacing-md); font-size: 0.75rem; color: var(--color-text-muted);">
          <span>Start: $${e.tokenB.startPrice.toLocaleString("en-US",{maximumFractionDigits:6})}</span>
          <span>End: $${r.endPriceB.toLocaleString("en-US",{maximumFractionDigits:6})}</span>
        </div>
      </div>
      <!-- Difference Summary -->
      <div style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
        ${r.actualWinner==="TIE"?'<span style="font-size: 0.85rem; color: var(--color-text-muted);">Both tokens performed equally!</span>':`<span style="font-size: 0.85rem;">${a.symbol.toUpperCase()} outperformed by <strong style="color: var(--color-success);">${Math.abs(r.changeA-r.changeB).toFixed(3)}%</strong></span>`}
      </div>
      <button id="close-duel-result-btn" class="btn ${r.userWon?"btn-success":"btn-primary"}" style="width: 100%;">
        ${r.userWon?"🏆 Claim Reward":"Claim Reward"}
      </button>
    </div>
  `;const s=t.querySelector("#close-duel-result-btn");s&&s.addEventListener("click",o=>{o.stopPropagation(),t.remove();const l=document.getElementById("selection-panel");if(l){l.style.display="none";const c=document.getElementById("duel-main-content");c&&(c.style.marginRight="0");const d=document.getElementById("token-grid"),m=document.querySelectorAll("#token-grid .token-card");d&&d.classList.remove("compact-grid"),m.forEach(h=>h.classList.remove("compact-mode"))}})}const Ze=document.createElement("style");Ze.textContent=`
  .time-option {
    padding: 0.5rem 1rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-primary);
    font-size: 0.875rem;
  }

  .time-option:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .time-option.selected {
    background: var(--gradient-green);
    border-color: transparent;
  }

  /* Torn Paper Effect for Duel Slip */
  #selection-panel::before {
    content: '';
  /* Torn Paper Effect for Duel Slip - REMOVED */
  #selection-panel::before {
    display: none;
  }

  /* Clip-path version - REMOVED */
  #selection-panel {
    /* Hide scrollbar but allow scrolling */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  #selection-panel::-webkit-scrollbar {
    display: none;
  }

  /* Compact mode for token cards when duel slip is open */
  #token-grid.compact-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: var(--spacing-sm) !important;
  }

  .token-card.compact-mode {
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
    min-height: unset;
  }

  .token-card.compact-mode .token-icon {
    width: 48px;
    height: 48px;
  }

  .token-card.compact-mode .token-icon img {
    width: 48px;
    height: 48px;
  }

  .token-card.compact-mode .token-info {
    flex: 0 0 auto;
  }

  .token-card.compact-mode .token-name {
    display: none;
  }

  .token-card.compact-mode .token-symbol {
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  .token-card.compact-mode .token-price {
    flex: 1;
    text-align: right;
  }

  .token-card.compact-mode .token-price-value {
    font-size: 1rem;
    margin-bottom: 2px;
  }

  .token-card.compact-mode .token-price-change {
    font-size: 0.9rem;
  }
`;document.head.appendChild(Ze);let Je=[],se=[];function re(){return[...Je]}function qt(e){Je=[...e],Vt()}function Wt(e){return se.push(e),()=>{const t=se.indexOf(e);t!==-1&&se.splice(t,1)}}function Vt(){se.forEach(e=>e(re()))}let xe=!1;function Fe(e){xe=e}function Yt(){const e=xe;return xe=!1,e}function Xt(){const e=document.createElement("div");e.className="dream-team-page",e.id="dream-team-page";const t=document.createElement("div");t.className="container",t.id="dream-team-container",t.style.cssText=`
    padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-xl);
    transition: all 0.3s ease;
  `;const r=document.createElement("div");r.style.cssText=`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  `;const a=document.createElement("div");a.className="card",a.style.cssText="position: relative; padding: var(--spacing-lg);";const i=fe();a.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
      <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Daily Competition</h3>
    </div>
    
    <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: var(--spacing-md); backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
      <div style="text-align: center; margin-bottom: var(--spacing-sm);">
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 2px;">Reference: UTC 00:00 Opening Price</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted);">Competition ends at 23:59 UTC</div>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
        <div>
          <div style="display: flex; align-items: center; gap: var(--spacing-xs); color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            Prize Pool
          </div>
          <div style="font-size: 1.5rem; font-weight: 700; color: #09C285;">$25,000</div>
        </div>
        <div style="text-align: right;">
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: var(--spacing-xs); color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Players
          </div>
          <div style="font-size: 1.5rem; font-weight: 700;">1,523</div>
        </div>
      </div>
      
      <div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs); color: var(--color-warning); font-size: 0.9rem; font-weight: 600; margin-bottom: var(--spacing-sm);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
        <span id="competition-timer">${i.timeRemainingFormatted}</span> remaining
      </div>
      
      <div style="display: flex; justify-content: center;">
        <button class="btn btn-primary" id="join-competition-btn">Join Competition</button>
      </div>
    </div>
    
    <div style="display: flex; justify-content: center; gap: var(--spacing-sm); margin-top: var(--spacing-sm);">
      <button class="carousel-btn" id="comp-prev" style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </button>
      <button class="carousel-btn" id="comp-next" style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>
    </div>
  `,setInterval(()=>{const u=a.querySelector("#competition-timer");if(u){const x=fe();u.textContent=x.timeRemainingFormatted}},1e3);const n=a.querySelector("#join-competition-btn");n&&(n.onclick=u=>{u.preventDefault();const x=document.getElementById("dream-team-controls");x&&x.scrollIntoView({behavior:"smooth",block:"start"})});const s=document.createElement("div");s.className="card",s.style.cssText="position: relative; padding: var(--spacing-md);",s.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <circle cx="12" cy="8" r="6"></circle>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
      </svg>
      <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Recent Winners</h3>
    </div>
    
    <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: var(--spacing-sm); backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 250px; overflow-y: auto;">
      <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white;">1</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x7a9f...3b2c</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Weekend Warriors</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$25,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">2h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white;">2</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x4e1d...8f9a</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Crypto Sprint</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$10,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">5h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #CD7F32 0%, #B87333 100%); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white;">3</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x9c2b...5d7e</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Daily Duel</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$5,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">8h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">4</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x3f8a...2c1d</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Bull Run</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$2,500</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">12h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">5</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x1b5e...7a4f</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Moon Shot</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$1,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">18h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">6</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x8d2c...4e7b</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Diamond Hands</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$750</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">20h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">7</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x2f9a...1c3d</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Altcoin Arena</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$500</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">21h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">8</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x5e7f...9a2b</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Token Titans</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$400</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">22h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">9</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x6a3b...8d4c</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Pump Masters</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$300</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">23h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">10</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x4c8d...2f5e</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Whale Watch</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$200</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">24h ago</div>
          </div>
        </div>
      </div>
    </div>
  `;const o=document.createElement("div");o.className="card",o.style.cssText="position: relative; padding: var(--spacing-md);",o.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">My Teams</h3>
    </div>
    
    <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: var(--spacing-sm); backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 280px; overflow-y: auto;">
      <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #09C285;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Alpha</div>
            <span class="badge badge-success" style="font-size: 0.65rem; padding: 0.15rem 0.4rem;">Active</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Weekend Warriors</div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #627EEA 0%, #4E5ECD 100%); border: 2px solid var(--color-bg-primary);"></div>
            <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #F7931A 0%, #E07A0A 100%); border: 2px solid var(--color-bg-primary);"></div>
            <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #8247E5 0%, #6B3CC7 100%); border: 2px solid var(--color-bg-primary);"></div>
            <div style="width: 20px; height: 20px; border-radius: 50%; background: var(--glass-bg); border: 2px solid var(--color-bg-primary); display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: var(--color-text-muted);">+12</div>
          </div>
        </div>
        
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--color-text-muted); opacity: 0.8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Beta</div>
            <span class="badge" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; background: var(--glass-bg);">Ended</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Crypto Sprint</div>
          <div style="font-size: 0.75rem; color: #09C285; font-weight: 600;">Rank: #42 • +$250</div>
        </div>
        
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--color-text-muted); opacity: 0.8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Gamma</div>
            <span class="badge" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; background: var(--glass-bg);">Ended</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Daily Duel</div>
          <div style="font-size: 0.75rem; color: #09C285; font-weight: 600;">Rank: #15 • +$500</div>
        </div>
        
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--color-text-muted); opacity: 0.8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Delta</div>
            <span class="badge" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; background: var(--glass-bg);">Ended</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Moon Shot</div>
          <div style="font-size: 0.75rem; color: #09C285; font-weight: 600;">Rank: #8 • +$1,200</div>
        </div>
      </div>
    </div>
  `,r.appendChild(a),r.appendChild(s),r.appendChild(o),t.appendChild(r);const l=document.createElement("div");l.style.cssText=`
    text-align: center;
    margin-bottom: var(--spacing-md);
  `,l.innerHTML=`
    <div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-xs);">
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="team-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="22" r="6" fill="url(#team-grad-page)"/>
        <path d="M20 48C20 38 25 34 32 34C39 34 44 38 44 48" fill="url(#team-grad-page)"/>
        <circle cx="16" cy="26" r="5" fill="url(#team-grad-page)" opacity="0.8"/>
        <path d="M8 48C8 40 11 36 16 36C21 36 24 40 24 48" fill="url(#team-grad-page)" opacity="0.8"/>
        <circle cx="48" cy="26" r="5" fill="url(#team-grad-page)" opacity="0.8"/>
        <path d="M40 48C40 40 43 36 48 36C53 36 56 40 56 48" fill="url(#team-grad-page)" opacity="0.8"/>
      </svg>
      <h1 style="font-size: 2rem; margin: 0;">Dream Team</h1>
    </div>
    <p style="color: var(--color-text-secondary); font-size: 1rem; margin: 0;">Build your ultimate crypto portfolio of 15 tokens</p>
  `,t.appendChild(l);const c=document.createElement("div");c.id="dream-team-controls",c.style.cssText=`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-lg);
    gap: var(--spacing-md);
    flex-wrap: wrap;
    scroll-margin-top: 80px;
  `;const d=document.createElement("div");d.style.cssText=`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  `,d.innerHTML=`
    <button class="category-btn active" data-category="all" style="padding: 0.375rem 0.875rem; border-radius: 12px; border: 1px solid var(--color-border); background: var(--color-primary); color: white; cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s;">All</button>
    <button class="category-btn" data-category="defi" style="padding: 0.375rem 0.875rem; border-radius: 12px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s;">DeFi</button>
    <button class="category-btn" data-category="layer2" style="padding: 0.375rem 0.875rem; border-radius: 12px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s;">Layer 2</button>
    <button class="category-btn" data-category="gaming" style="padding: 0.375rem 0.875rem; border-radius: 12px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s;">Gaming</button>
    <button class="category-btn" data-category="meme" style="padding: 0.375rem 0.875rem; border-radius: 12px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s;">Meme</button>
  `;const m=document.createElement("div");m.style.cssText=`
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-shrink: 0;
  `;const h=document.createElement("div");h.style.cssText="transition: all 0.3s ease;",h.innerHTML=`
    <input type="text" class="input" placeholder="Search tokens..." id="search-input" style="width: 180px; border-radius: 12px; padding: 0.5rem 1rem; font-size: 0.85rem; border: 1px solid var(--color-border); background: var(--color-bg-secondary);" />
  `;const p=document.createElement("div");p.id="selected-badge",p.className="badge badge-primary",p.style.cssText=`
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 600;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    display: none;
    white-space: nowrap;
  `,p.innerHTML='<span id="selected-count">0</span>/15',m.appendChild(h),m.appendChild(p),c.appendChild(d),c.appendChild(m),t.appendChild(c);const g=document.createElement("div");g.id="token-grid-wrapper";const b=document.createElement("div");b.id="token-grid",b.className="grid grid-auto",g.appendChild(b),t.appendChild(g);const f=document.createElement("div");f.id="action-bar",f.style.cssText=`
    position: fixed;
    bottom: 24px;
    left: 0;
    right: 0;
    background: transparent;
    padding: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 100;
    pointer-events: none;
  `,f.innerHTML=`
    <div style="
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 18px;
      padding: 6px;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.12), 
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.35);
      pointer-events: auto;
    ">
      <button class="btn btn-primary" id="bottom-submit-btn" style="
        padding: 0.875rem 2.5rem; 
        font-size: 1.1rem; 
        background: var(--color-primary);
        border: none;
        border-radius: 14px;
        color: white;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(9, 194, 133, 0.35);
      ">
        Proceed to Submit
      </button>
    </div>
  `,e.appendChild(f),e.appendChild(t),Q(b);const y=d.querySelectorAll(".category-btn");y.forEach(u=>{u.addEventListener("click",()=>{y.forEach(k=>{k.style.background="var(--color-bg-secondary)",k.style.color="var(--color-text-primary)",k.classList.remove("active")}),u.style.background="var(--color-primary)",u.style.color="white",u.classList.add("active");const x=u.dataset.category;et(x,b)})});const w=h.querySelector("#search-input");let T;return w.addEventListener("input",u=>{clearTimeout(T),T=setTimeout(()=>{u.target.value.trim()?Qe(u.target.value,b):Q(b)},300)}),e}let E=re();function Ne(){qt(E)}async function Q(e){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const t=await te(250);Se(t,e),E=re(),ge(),Yt()&&E.length===15&&setTimeout(()=>rt(),500)}catch{e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `}}async function Qe(e,t){t.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=await qe(e);r.length===0?t.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);">
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-danger); margin-bottom: var(--spacing-sm);">
            YOU CANNOT CHOOSE THIS TOKEN IN THE DREAM TEAM
          </div>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
            Try searching for a different cryptocurrency from our available list.
          </div>
        </div>
      `:Se(r,t)}catch{t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Search failed. Please try again.
      </div>
    `}}async function et(e,t){if(e==="all"){Q(t);return}t.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=await te(250),i={defi:["AAVE","UNI","CAKE","MORPHO","PENDLE","COMP","SNX","DYDX","RUNE","SUSHI","CRV"],layer2:["ARB","OP","STRK","ZK","ZRO","LINEA","MERL","ZORA","MANTA"],gaming:["AXS","GALA","SAND","IMX","MANA","WEMIX","RON","BEAM","PRIME"],meme:["DOGE","SHIB","PEPE","BONK","FLOKI","WIF","FARTCOIN","CHEEMS","BABYDOGE"]}[e]||[],n=r.filter(s=>i.includes(s.symbol.toUpperCase()));n.length===0?t.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-text-secondary);">
          No tokens found in this category
        </div>
      `:Se(n,t)}catch{t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again.
      </div>
    `}}function Se(e,t){t.innerHTML="",e.forEach(r=>{const a=Kt(r);t.appendChild(a)})}function Kt(e){const t=document.createElement("div");t.className="card token-card",t.dataset.tokenId=e.id,t.style.cssText=`
    cursor: pointer;
    transition: all var(--transition-base);
    animation: fadeIn 0.6s ease-out;
  `;const r=R(e.priceChange24h),a=E.findIndex(c=>c.id===e.id),i=a>-1,n=i?E[a].direction:null;i&&(n==="UP"?t.classList.add("selected-up"):n==="DOWN"?t.classList.add("selected-down"):t.classList.add("selected"));const s=e.name.length<=8;t.innerHTML=`
    <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
      <img src="${e.image}" alt="${e.name}" class="lifted-element" style="width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;" />
      <div style="width: 55px; flex-shrink: 0;">
        <div class="lifted-element" style="font-weight: 700; font-size: 1rem; ${s?"margin-bottom: 2px;":""}">${e.symbol.toUpperCase()}</div>
        ${s?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${e.name}</div>`:""}
      </div>
      <!-- ✅ FIXED-WIDTH RIGHT COLUMN -->
      <div style="width: 90px; text-align: right; flex-shrink: 0;">
        <div class="token-current-price" style="font-size: 0.95rem; font-weight: 700; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${S(e.currentPrice)}
        </div>
        <div class="token-price-change ${r}" style="font-size: 0.8rem; white-space: nowrap;">
          ${U(e.priceChange24h)}
        </div>
      </div>

    </div>
    <!-- Split Selection Overlay -->
    <div class="selection-overlay">
      <div class="selection-overlay-left" onclick="event.stopPropagation();"></div>
      <div class="selection-overlay-right" onclick="event.stopPropagation();"></div>
    </div>
  `;const o=t.querySelector(".selection-overlay-left"),l=t.querySelector(".selection-overlay-right");return o&&o.addEventListener("click",c=>{c.stopPropagation(),ye(e,t,"DOWN")}),l&&l.addEventListener("click",c=>{c.stopPropagation(),ye(e,t,"UP")}),t.addEventListener("click",c=>{i&&!c.target.closest(".selection-overlay")&&ye(e,t,null)}),t}function Zt(){const e=["#09C285","#4a90e2","#FFD700","#FF6B6B","#4ECDC4","#95E1D3"];for(let r=0;r<50;r++){const a=document.createElement("div");a.style.cssText=`
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${e[Math.floor(Math.random()*e.length)]};
      left: ${Math.random()*100}vw;
      top: -10px;
      opacity: 1;
      border-radius: ${Math.random()>.5?"50%":"0"};
      z-index: 9999;
      pointer-events: none;
      animation: confetti-fall ${2+Math.random()*2}s linear forwards;
    `,document.body.appendChild(a),setTimeout(()=>{a.remove()},4e3)}}const tt=document.createElement("style");tt.textContent=`
  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(${360+Math.random()*360}deg);
      opacity: 0;
    }
  }
`;document.head.appendChild(tt);function ye(e,t,r){const a=E.findIndex(i=>i.id===e.id);if(a>-1)if(r===null)E.splice(a,1),t.classList.remove("selected","selected-up","selected-down");else if(E[a].direction===r)E.splice(a,1),t.classList.remove("selected","selected-up","selected-down");else{E[a].direction=r,t.classList.remove("selected-up","selected-down"),t.classList.add(r==="UP"?"selected-up":"selected-down");const i=t.querySelector(".badge");i&&(i.className=`badge ${r==="UP"?"badge-success":"badge-danger"}`,i.textContent=r==="UP"?"UP":"Down")}else{if(E.length>=15){alert("You can only select up to 15 tokens!");return}const i=r||"UP";E.push({...e,direction:i}),t.classList.add(i==="UP"?"selected-up":"selected-down")}ge()}function ge(){const e=document.getElementById("dream-team-page"),t=document.getElementById("dream-team-container"),r=document.getElementById("token-grid-wrapper"),a=document.getElementById("token-grid"),i=document.querySelector(".dream-team-page .container > div:first-child"),n=t==null?void 0:t.querySelector('div[style*="text-align: center"]'),s=n==null?void 0:n.nextElementSibling;if(E.length>0&&e&&t&&r){if(e.style.cssText=`
      display: flex;
      flex-direction: column;
      height: calc(100vh - 64px);
      overflow: hidden;
    `,t.style.cssText=`
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: var(--spacing-sm) var(--spacing-md) 0;
      transition: all 0.3s ease;
    `,r.style.cssText=`
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-lg) var(--spacing-sm) var(--spacing-lg) 0;
    `,n){n.style.cssText=`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0;
        gap: var(--spacing-md);
      `;const g=n.querySelector('div[style*="justify-content: center"]'),b=n.querySelector("p");if(g){g.style.justifyContent="flex-start",g.style.marginBottom="0";const f=g.querySelector("h1");f&&(f.style.fontSize="1.5rem");const y=g.querySelector("svg");y&&(y.setAttribute("width","28"),y.setAttribute("height","28"))}if(b&&(b.style.display="none"),s){s.style.display="none";const f=s.querySelector("div:first-child"),y=s.querySelector("div:last-child");if(f&&!n.querySelector(".category-btn")){const w=f.cloneNode(!0);w.id="compact-categories",n.appendChild(w),w.querySelectorAll(".category-btn").forEach(T=>{T.addEventListener("click",()=>{w.querySelectorAll(".category-btn").forEach(k=>{k.style.background="var(--color-bg-secondary)",k.style.color="var(--color-text-primary)"}),T.style.background="var(--color-primary)",T.style.color="white";const u=T.dataset.category,x=document.getElementById("token-grid");x&&et(u,x)})})}if(y&&!n.querySelector("#search-input")){const w=y.cloneNode(!0);w.id="compact-right",n.appendChild(w);const T=w.querySelector("#search-input");if(T){T.id="search-input";let u;T.addEventListener("input",x=>{clearTimeout(u),u=setTimeout(()=>{const k=document.getElementById("token-grid");x.target.value.trim()&&k?Qe(x.target.value,k):k&&Q(k)},300)})}}}}const p=document.createElement("style");p.id="token-grid-scrollbar",document.getElementById("token-grid-scrollbar")||(p.textContent=`
        #token-grid-wrapper::-webkit-scrollbar {
          width: 8px;
        }
        #token-grid-wrapper::-webkit-scrollbar-track {
          background: transparent;
          margin: var(--spacing-md) 0;
        }
        #token-grid-wrapper::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        #token-grid-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `,document.head.appendChild(p)),i&&(i.style.display="none"),a&&(a.style.gridTemplateColumns="repeat(5, 1fr)",a.style.gap="var(--spacing-sm)")}else if(e&&t&&r){if(e.style.cssText="",t.style.cssText=`
      padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-xl);
      transition: all 0.3s ease;
    `,r.style.cssText="display: block;",n){n.style.cssText=`
        text-align: center;
        margin-bottom: var(--spacing-md);
      `;const p=n.querySelector('div[style*="flex-start"], div[style*="justify-content"]'),g=n.querySelector("p");if(p){p.style.justifyContent="center",p.style.marginBottom="var(--spacing-xs)";const y=p.querySelector("h1");y&&(y.style.fontSize="2rem");const w=p.querySelector("svg");w&&(w.setAttribute("width","36"),w.setAttribute("height","36"))}g&&(g.style.display="block");const b=n.querySelector("#compact-categories"),f=n.querySelector("#compact-right");b&&b.remove(),f&&f.remove()}s&&(s.style.display="flex"),i&&(i.style.display="grid"),a&&(a.style.gridTemplateColumns="",a.style.gap="")}const o=document.getElementById("selected-count");o&&(o.textContent=E.length);const l=document.getElementById("selected-badge"),c=document.getElementById("search-input");let d=document.getElementById("unselect-all-btn");if(!d){d=document.createElement("button"),d.id="unselect-all-btn",d.innerHTML=`
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear
    `,d.style.cssText=`
      display: none;
      align-items: center;
      gap: 4px;
      padding: 0.5rem 0.75rem;
      border-radius: 12px;
      border: none;
      background: rgba(255, 77, 79, 0.15);
      color: var(--color-danger);
      font-size: 0.8rem;
      font-weight: 600;
      line-height: 1.5;
      height: 36px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.2s ease;
    `,d.onmouseover=()=>{d.style.background="rgba(255, 77, 79, 0.2)"},d.onmouseout=()=>{d.style.background="rgba(255, 77, 79, 0.15)"};const p=document.getElementById("selected-badge");p&&p.parentNode&&p.parentNode.insertBefore(d,p)}d.onclick=()=>{E=[],Ne(),document.querySelectorAll(".token-card").forEach(g=>{g.classList.remove("selected","selected-up","selected-down");const b=g.querySelector(".badge");b&&b.remove()});const p=document.getElementById("token-grid");p&&Q(p),ge()},l&&(E.length>0?(l.style.display="block",d&&(d.style.display="flex"),setTimeout(()=>{l.style.opacity="1",l.style.transform="translateX(0)"},10),l.style.fontSize="0.8rem",l.style.padding="0.5rem 1rem",l.style.borderRadius="12px",l.style.fontWeight="600",l.style.lineHeight="1.5",l.style.height="36px",l.style.boxSizing="border-box",l.style.display="inline-flex",l.style.alignItems="center",c&&(c.placeholder="Search tokens...",c.style.width="180px"),E.length===15?(l.className="badge badge-success",l.style.background="var(--color-primary)",l.style.color="white",l.style.border="none"):(l.className="badge badge-primary",l.style.background="",l.style.color="",l.style.border="")):(l.style.opacity="0",l.style.transform="translateX(20px)",d&&(d.style.display="none"),c&&(c.placeholder="Search...",c.style.width="160px"),setTimeout(()=>{l.style.display="none"},300)));const m=document.getElementById("action-bar");m&&(E.length===15?(m.style.display="flex",m.dataset.confettiShown||(Zt(),m.dataset.confettiShown="true")):(m.style.display="none",m.dataset.confettiShown=""));const h=document.getElementById("bottom-submit-btn");h&&(h.style.cssText="padding: 0.895rem 2.5rem; font-size: 1.125rem; background: var(--color-primary); color: white; border: none;",h.onclick=()=>rt()),Ne()}function rt(){const e=document.createElement("div");e.className="modal-overlay",e.style.animation="fadeIn 0.2s ease-out",e.style.backdropFilter="blur(4px)",e.style.webkitBackdropFilter="blur(4px)";const t=document.createElement("div");t.className="modal",t.style.maxWidth="600px",t.style.boxShadow="0 20px 60px rgba(0, 0, 0, 0.3)";function r(){t.innerHTML=`
        <button class="modal-close">×</button>
        <h2 class="modal-title" style="color: #000;">Select Team Leaders</h2>
        
        <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--spacing-md); height: 100%;">
          
          <!-- Leadership Section (Top) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); padding-bottom: var(--spacing-sm); border-bottom: 1px solid var(--glass-border);">
            
            <!-- Captain Slot -->
            <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                <div style="font-size: 0.8rem; font-weight: 700; color: #000; text-transform: uppercase;">
                    Captain (2x)
                </div>
                <div id="captain-slot"></div>
            </div>

            <!-- Vice Captain Slot -->
            <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                <div style="font-size: 0.8rem; font-weight: 700; color: #000; text-transform: uppercase;">
                    Vice Captain (1.5x)
                </div>
                <div id="vice-slot"></div>
            </div>
            
          </div>

          <!-- Roster Section (Bottom) -->
          <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: var(--spacing-xs);">
             <div style="font-size: 0.8rem; color: var(--color-text-secondary); sticky: top;">
                  Team Roster (${E.length-(i!==-1?1:0)-(n!==-1?1:0)} Remaining)
             </div>
             <div id="roster-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xs);"></div>
          </div>
          
        </div>
      `;const o=t.querySelector("#captain-slot");if(i!==-1){const m=E[i],h=a(m,i,"CAPTAIN");o.appendChild(h)}else o.innerHTML=`
            <div style="
                border: 1px dashed var(--color-primary); 
                border-radius: var(--radius-lg); 
                height: 60px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.8rem; 
                color: var(--color-primary);
                background: rgba(var(--color-primary-rgb), 0.05);
                font-weight: 600;
            ">
                Select Captain
            </div>
          `;const l=t.querySelector("#vice-slot");if(n!==-1){const m=E[n],h=a(m,n,"VICE");l.appendChild(h)}else l.innerHTML=`
            <div style="
                border: 1px dashed #FFD700; 
                border-radius: var(--radius-lg); 
                height: 60px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.8rem; 
                color: #B8860B; /* Darker Gold for text visibility */
                background: rgba(255, 215, 0, 0.05);
                font-weight: 600;
            ">
                Select Vice
            </div>
          `;const c=t.querySelector("#roster-grid"),d=E.filter((m,h)=>h!==i&&h!==n);d.forEach((m,h)=>{const p=E.indexOf(m),g=a(m,p,"ROSTER");d.length%2===1&&h===d.length-1&&(g.style.gridColumn="span 2",g.style.maxWidth="50%",g.style.margin="0 auto"),c.appendChild(g)}),t.querySelector(".modal-close").addEventListener("click",()=>e.remove()),s()}function a(o,l,c){const d=document.createElement("div"),m=c!=="ROSTER";let h="1px solid var(--glass-border)",p="var(--glass-bg)";c==="CAPTAIN"?(p="rgba(0, 123, 255, 0.15)",h="1px solid #007bff"):c==="VICE"&&(p="rgba(255, 215, 0, 0.15)",h="1px solid #FFD700"),d.className="card",d.style.cssText=`
        padding: ${m?"var(--spacing-sm)":"6px"};
        display: flex;
        align-items: center;
        gap: ${m?"var(--spacing-sm)":"8px"};
        background: ${p};
        border: ${h};
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;
        min-height: ${m?"auto":"50px"};
      `;const g=o.direction==="UP"?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12 12 5 19 12"></polyline></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="19 12 12 19 5 12"></polyline></svg>';if(d.innerHTML=`
        <div style="position: relative;">
            <img src="${o.image}" alt="${o.name}" style="width: ${m?"40px":"28px"}; height: ${m?"40px":"28px"}; border-radius: 50%;" />
            <!-- Direction Arrow Indicator -->
            <div style="position: absolute; bottom: -4px; right: -4px; background: white; border-radius: 50%; padding: 2px; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                ${g}
            </div>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 600; font-size: ${m?"1rem":"0.8rem"}; line-height: 1.2; color: #000;">${o.symbol.toUpperCase()}</div>
        </div>
        
        ${c==="ROSTER"?`
            <div style="display: flex; gap: 6px;">
                <button class="btn-swap" style="background: var(--color-primary); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                    C
                </button>
                <button class="btn-vice" style="background: #FFD700; color: #000; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                    VC
                </button>
            </div>
        `:""}
      `,c==="ROSTER"){const b=d.querySelector(".btn-swap");b&&(b.onclick=y=>{y.stopPropagation(),i=l,l===n&&(n=-1),r()});const f=d.querySelector(".btn-vice");f&&(f.onclick=y=>{y.stopPropagation(),n=l,r()})}return d}let i=-1,n=-1;r();async function s(){const o=t.querySelector(".modal-body"),l=o.querySelector(".submit-team-btn");l&&l.remove();const c=document.createElement("button");c.className="btn btn-primary submit-team-btn",c.style.width="fit-content",c.style.display="block",c.style.margin="var(--spacing-md) auto",c.style.padding="0.875rem 5rem",c.style.cssText+="background: #09C285 !important; color: white !important; border: none !important; opacity: 1;",c.textContent="Submit Team",o.appendChild(c),c.addEventListener("click",async()=>{if(i===-1||n===-1){alert("Please select captain and vice captain first");return}c.disabled=!0,c.innerHTML='<div class="loading"></div>';try{const d=await At({team:E.map(m=>({id:m.id,direction:m.direction})),captainIndex:i,viceCaptainIndex:n});e.remove(),alert(`✅ ${d.message}

Team ID: ${d.teamId}
Transaction: ${d.txHash.slice(0,10)}...`),E=[],ge()}catch(d){c.disabled=!1,c.textContent="Submit Team",alert(`❌ Error: ${d.message}`)}})}t.querySelector(".modal-close").addEventListener("click",()=>e.remove()),e.addEventListener("click",o=>{o.target===e&&e.remove()}),e.appendChild(t),document.body.appendChild(e)}const j=new Map;function Jt(){const e=document.createElement("div");e.className="time-based-page",e.style.height="calc(100vh - 64px)",e.style.overflowY="auto";const t=document.createElement("div");t.className="container",t.style.padding="var(--spacing-xl) var(--spacing-lg)";const r=document.createElement("div");r.style.marginBottom="var(--spacing-xl)";const a=`
    <defs>
      <linearGradient id="time-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3B82F6"/>
        <stop offset="100%" style="stop-color:#2563EB"/>
      </linearGradient>
    </defs>
  `;r.innerHTML=`
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${a}
        <style>
          @keyframes tick {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .stopwatch-hand {
            transform-origin: 32px 34px;
            animation: tick 2s steps(60) infinite;
          }
        </style>
        <!-- Stopwatch Body -->
        <circle cx="32" cy="34" r="24" stroke="url(#time-grad-page)" stroke-width="3" fill="none"/>
        <circle cx="32" cy="34" r="24" stroke="url(#time-grad-page)" stroke-width="3" fill="url(#time-grad-page)" opacity="0.1"/>
        
        <!-- Top Button -->
        <path d="M26 6H38V10H26V6Z" fill="url(#time-grad-page)"/>
        <rect x="30" y="2" width="4" height="4" fill="url(#time-grad-page)"/>
        
        <!-- Ticks -->
        <path d="M32 14V17" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        <path d="M32 51V54" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        <path d="M52 34H49" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        <path d="M15 34H12" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        
        <!-- Hand -->
        <line x1="32" y1="34" x2="32" y2="18" stroke="#FF4D4F" stroke-width="2" stroke-linecap="round" class="stopwatch-hand"/>
        
        <!-- Center Dot -->
        <circle cx="32" cy="34" r="3" fill="#3B82F6"/>
      </svg>
      1min Frenzy
    </h1>
    <p style="text-align: center; color: var(--color-text-secondary); font-size: 1.125rem;">
      Predict if the price will go UP or DOWN in 1 minute.
    </p>
  `,t.appendChild(r);const i=document.createElement("div");return i.id="token-grid",i.className="grid",i.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  `,t.appendChild(i),e.appendChild(t),Qt(i),window.addEventListener("hashchange",()=>{j.forEach(n=>{n.timerInterval&&clearInterval(n.timerInterval)}),j.clear()},{once:!0}),e}async function Qt(e){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=await _(["BTC","ETH","SOL","XRP","DOGE","PEPE","BNB","ADA","AVAX","LINK","DOT","SHIB","LTC","UNI","NEAR","ATOM","ARB","OP","SUI","APT"]);if(r&&r.length>0){const a=r.map(i=>({...i,currentPrice:i.price}));er(a,e)}else throw new Error("No Binance tokens found")}catch(t){console.error("Error loading tokens:",t),e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens from Binance. Please try again later.
      </div>
    `}}function er(e,t){t.innerHTML="",e.forEach(r=>{const a=tr(r);t.appendChild(a)})}function tr(e){const t=document.createElement("div");t.className="card prediction-card",t.dataset.symbol=e.symbol,t.style.cssText=`
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.6s ease-out;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    position: relative;
    overflow: hidden;
  `;const r=R(e.priceChange24h),a=S(e.currentPrice);t.innerHTML=`
    <!-- Header -->
    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
      <img src="${e.image}" alt="${e.name}" style="width: 48px; height: 48px; border-radius: 50%;" />
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 2px;">${e.name}</div>
        <div style="font-size: 0.875rem; color: var(--color-text-muted);">${e.symbol.toUpperCase()}</div>
      </div>
      <div style="text-align: right;">
        <div class="token-price" style="font-size: 1.1rem; font-weight: 700;">${a}</div>
        <div class="token-change ${r}" style="font-size: 0.875rem;">${U(e.priceChange24h)}</div>
      </div>
    </div>

    <!-- Prediction Area -->
    <div class="prediction-area" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
      <div style="text-align: center; font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-xs);">
        Will ${e.symbol.toUpperCase()} go UP or DOWN in 1 min?
      </div>

      <div style="display: flex; gap: var(--spacing-md);">
        <!-- UP Button -->
        <button class="predict-btn up-btn" data-type="UP" style="
          flex: 1;
          padding: 1rem;
          background: rgba(9, 194, 133, 0.1);
          border: 1px solid rgba(9, 194, 133, 0.3);
          border-radius: var(--radius-md);
          color: #09C285;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          UP
        </button>

        <!-- DOWN Button -->
        <button class="predict-btn down-btn" data-type="DOWN" style="
          flex: 1;
          padding: 1rem;
          background: rgba(255, 77, 79, 0.1);
          border: 1px solid rgba(255, 77, 79, 0.3);
          border-radius: var(--radius-md);
          color: #FF4D4F;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          DOWN
        </button>
      </div>
    </div>

    <!-- Active Timer State (Hidden initially) -->
    <div class="active-state" style="display: none; flex-direction: column; align-items: center; padding: var(--spacing-md); background: var(--color-bg-tertiary); border-radius: var(--radius-md); text-align: center;">
      <div style="font-size: 0.9rem; margin-bottom: var(--spacing-sm); color: var(--color-text-muted);">
        Predicted: <span class="prediction-text" style="font-weight: 700;"></span>
      </div>
      <div class="timer-display" style="font-size: 2rem; font-weight: 700; font-variant-numeric: tabular-nums; margin-bottom: var(--spacing-sm);">
        01:00
      </div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted);">
        Start Price: <span class="start-price">...</span>
      </div>
      <div class="current-price-display" style="font-size: 0.9rem; font-weight: 600; margin-top: 4px;">
        Current: <span class="current-price">...</span>
      </div>
    </div>

    <!-- Result State (Hidden initially) -->
    <div class="result-state" style="display: none; flex-direction: column; align-items: center; padding: var(--spacing-md); background: var(--color-bg-tertiary); border-radius: var(--radius-md); text-align: center;">
    </div>
  `,me(e.symbol,s=>{rr(t,s)});const i=t.querySelector(".up-btn"),n=t.querySelector(".down-btn");return i.addEventListener("click",()=>Ie(e,"UP",t)),n.addEventListener("click",()=>Ie(e,"DOWN",t)),t}function rr(e,t){const r=e.querySelector(".token-price"),a=e.querySelector(".token-change");if(r&&a){const n=parseFloat(r.dataset.rawPrice||0);r.textContent=S(t.price),r.dataset.rawPrice=t.price,n&&n!==t.price&&(r.style.color=t.price>n?"#09C285":"#FF4D4F",setTimeout(()=>{r.style.color=""},300)),a.textContent=U(t.priceChange24h),a.className=`token-change ${R(t.priceChange24h)}`}const i=e.querySelector(".active-state");if(i.style.display!=="none"){const n=i.querySelector(".current-price");if(n){n.textContent=S(t.price);const s=e.dataset.symbol,o=j.get(s);if(o){const l=o.startPrice,c=o.type,d=c==="UP"&&t.price>l||c==="DOWN"&&t.price<l;n.style.color=d?"#09C285":"#FF4D4F"}}}}async function Ie(e,t,r){if(!C.getState().connected){alert("Please connect your wallet first!");return}if(j.has(e.symbol))return;const i=r.querySelector(".prediction-area"),n=r.querySelector(".active-state");n.querySelector(".prediction-text"),n.querySelector(".start-price"),n.querySelector(".current-price"),n.querySelector(".timer-display"),r.querySelector(".result-state"),i.style.display="none",n.style.display="flex",n.innerHTML='<div class="loading"></div> Preparing...';try{let s=e.currentPrice;try{s=(await Ee(e.symbol)).price}catch{console.log("Using cached price for start")}n.innerHTML=`
      <div style="font-size: 0.9rem; margin-bottom: var(--spacing-sm); color: var(--color-text-muted);">
        Predicted: <span class="prediction-text" style="font-weight: 700; color: ${t==="UP"?"#09C285":"#FF4D4F"}">${t}</span>
      </div>
      <div class="timer-display" style="font-size: 2.5rem; font-weight: 700; font-variant-numeric: tabular-nums; margin-bottom: var(--spacing-sm);">
        01:00
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.85rem; padding: 0 var(--spacing-md);">
        <div>Start: <span class="start-price">${S(s)}</span></div>
        <div>Current: <span class="current-price">${S(s)}</span></div>
      </div>
    `;const o=60,l=Date.now(),c=l+o*1e3,d={type:t,startPrice:s,startTime:l,timerInterval:null};j.set(e.symbol,d);const m=()=>{const h=Date.now(),p=c-h,b=(window.location.hash.replace("#","")||"/")==="/time-based";if(p<=0){clearInterval(d.timerInterval),ar(e,r,d);const y=document.getElementById(`frenzy-tracker-${e.symbol}`);y&&y.remove();return}const f=Math.ceil(p/1e3);if(b){const y=n.querySelector(".timer-display");y&&(y.textContent=`00:${f.toString().padStart(2,"0")}`,f<=10?y.style.color="#FF4D4F":y.style.color="");const w=document.getElementById(`frenzy-tracker-${e.symbol}`);w&&(w.style.display="none")}else{const y=nr(e.symbol,t,c);y.style.display="flex",or(y,e.symbol,t,p)}};d.timerInterval=setInterval(m,1e3),m(),window.addEventListener("hashchange",m)}catch(s){console.error(s),alert("Failed to start prediction"),i.style.display="flex",n.style.display="none"}}async function ar(e,t,r){const a=t.querySelector(".active-state"),i=t.querySelector(".result-state");a.style.display="none",i.style.display="flex",i.innerHTML='<div class="loading"></div> Calculating...';try{let n=r.startPrice;try{n=(await Ee(e.symbol)).price}catch(m){console.error("Error fetching final price",m)}const s=n>r.startPrice,o=n<r.startPrice,l=n===r.startPrice;let c=!1;r.type==="UP"&&s&&(c=!0),r.type==="DOWN"&&o&&(c=!0),i.innerHTML=`
      <div style="font-size: 3rem; margin-bottom: var(--spacing-sm); animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
        ${c?"🎉":"😔"}
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-xs); color: ${c?"var(--color-success)":"var(--color-danger)"};">
        ${c?"You Won!":"You Lost"}
      </div>
      <div style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
        Price went ${s?"UP":o?"DOWN":"NOWHERE"} (${S(r.startPrice)} → ${S(n)})
      </div>
      <button class="reset-btn" style="
        background: ${c?"var(--color-primary)":"var(--color-bg-secondary)"};
        color: ${c?"white":"var(--color-text-primary)"};
        border: 1px solid ${c?"transparent":"var(--glass-border)"};
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      ">
        ${c?"Claim Reward":"Close"}
      </button>
    `;const d=i.querySelector(".reset-btn");d.onclick=()=>{j.delete(e.symbol),i.style.display="none",t.querySelector(".prediction-area").style.display="flex"}}catch(n){console.error(n),i.innerHTML=`
      <div style="color: var(--color-danger);">Error calculating results.</div>
      <button class="reset-btn">Close</button>
    `,i.querySelector(".reset-btn").onclick=()=>{j.delete(e.symbol),i.style.display="none",t.querySelector(".prediction-area").style.display="flex"}}}function ir(){const e="frenzy-tracker-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
        .frenzy-tracker-card {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            
            min-width: 220px;
            padding: 12px 20px;
            
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            animation: fadeIn 0.3s ease-out;
            color: white;
            font-family: var(--font-primary);
        }

        .frenzy-tracker-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            border-color: var(--color-primary);
        }

        .frenzy-tracker-card.pulse {
            animation: frenzyTrackerPulse 2s infinite;
        }

        @keyframes frenzyTrackerPulse {
          0% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          50% {
            box-shadow: 0 4px 25px rgba(59, 130, 246, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
        }
    `,document.head.appendChild(t)}function nr(e,t,r){const a=`frenzy-tracker-${e}`;let i=document.getElementById(a);return i||(ir(),i=document.createElement("div"),i.id=a,i.className="frenzy-tracker-card pulse",i.addEventListener("click",()=>{window.location.hash="#/time-based"}),document.body.appendChild(i)),i}function or(e,t,r,a){const i=Math.floor(a%36e5/6e4),n=Math.floor(a%6e4/1e3),s=i>0?`${i}:${n.toString().padStart(2,"0")}`:`00:${n.toString().padStart(2,"0")}`,o=r==="UP"?"#09C285":"#FF4D4F",l=r==="UP"?"↑":"↓";e.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 500;">1min Frenzy</div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 0.95rem;">${t}</span>
                <span style="color: ${o}; font-weight: 700; font-size: 0.9rem;">${l} ${r}</span>
            </div>
        </div>
        <div style="font-family: monospace; font-size: 1.25rem; font-weight: 700; color: ${n<=10?"#FF4D4F":"white"};">
            ${s}
        </div>
    `}let ce=[];const Me=new Map,ee=new Map,sr={1:"1m",3:"3m",5:"5m",15:"15m",30:"30m",60:"1h"};function lr(){const e=document.createElement("div");e.className="predict-candle-page";const t=document.createElement("div");t.className="container",t.style.padding="var(--spacing-md) var(--spacing-lg)";const r=document.createElement("div");r.style.cssText="margin-bottom: var(--spacing-lg); text-align: center;",r.innerHTML=`
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="green-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
          <linearGradient id="red-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF4D4F"/>
            <stop offset="100%" style="stop-color:#ff3336"/>
          </linearGradient>
        </defs>
        <line x1="10" y1="20" x2="10" y2="48" stroke="url(#green-grad-page)" stroke-width="1.5"/>
        <rect x="7" y="28" width="6" height="16" fill="url(#green-grad-page)" rx="1"/>
        <line x1="20" y1="16" x2="20" y2="44" stroke="url(#red-grad-page)" stroke-width="1.5"/>
        <rect x="17" y="24" width="6" height="12" fill="url(#red-grad-page)" rx="1"/>
        <line x1="30" y1="22" x2="30" y2="50" stroke="url(#green-grad-page)" stroke-width="1.5"/>
        <rect x="27" y="30" width="6" height="14" fill="url(#green-grad-page)" rx="1"/>
        <line x1="40" y1="18" x2="40" y2="46" stroke="url(#red-grad-page)" stroke-width="1.5"/>
        <rect x="37" y="26" width="6" height="14" fill="url(#red-grad-page)" rx="1"/>
        <line x1="50" y1="14" x2="50" y2="42" stroke="url(#green-grad-page)" stroke-width="1.5"/>
        <rect x="47" y="22" width="6" height="16" fill="url(#green-grad-page)" rx="1"/>
      </svg>
      Predict the Candle
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1.125rem;">
      Predict if the next candle will be green (up) or red (down)
    </p>
  `,t.appendChild(r);const a=document.createElement("div");a.style.cssText=`
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
  `,a.innerHTML=`
    <button class="timeframe-btn" data-minutes="1">1 Min</button>
    <button class="timeframe-btn" data-minutes="3">3 Min</button>
    <button class="timeframe-btn selected" data-minutes="5">5 Min</button>
    <button class="timeframe-btn" data-minutes="15">15 Min</button>
    <button class="timeframe-btn" data-minutes="30">30 Min</button>
    <button class="timeframe-btn" data-minutes="60">1 Hour</button>
  `,t.appendChild(a);const i=document.createElement("div");i.id="candle-token-grid",i.className="grid",i.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  `,t.appendChild(i),e.appendChild(t);let n=5;return a.querySelectorAll(".timeframe-btn").forEach(s=>{s.addEventListener("click",()=>{a.querySelectorAll(".timeframe-btn").forEach(o=>o.classList.remove("selected")),s.classList.add("selected"),n=parseInt(s.dataset.minutes),Oe(i,n)})}),Oe(i,n),window.addEventListener("hashchange",()=>{at()}),e}function at(){ce.forEach(e=>{typeof e=="function"&&e()}),ce=[],Me.clear()}async function Oe(e,t){at(),e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=Ke(12),a=sr[t]||"5m";e.innerHTML="";for(const i of r){const n=await cr(i,a,t);e.appendChild(n)}}catch(r){console.error("Error loading tokens:",r),e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `}}async function cr(e,t,r){const a=document.createElement("div");a.className="card candle-card",a.id=`candle-card-${e.symbol}`,a.style.cssText=`
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.6s ease-out;
    min-height: 300px;
  `;let i=[],n=0,s=0;try{if(i=await Ve(e.symbol,t,15),Me.set(e.symbol,[...i]),i.length>0){n=i[i.length-1].close;const u=i[0].open;s=(n-u)/u*100}}catch(u){console.error(`Error fetching candles for ${e.symbol}:`,u)}let o=50,l=50;if(i.length>0){const u=i.filter(k=>k.isGreen).length,x=i.length;o=Math.round(u/x*100),l=100-o,o=Math.max(10,Math.min(90,o)),l=Math.max(10,Math.min(90,l))}a.innerHTML=`
    <!-- Token Header -->
    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
      <img src="${e.image}" alt="${e.name}" style="width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.1); padding: 4px;" onerror="this.src='https://via.placeholder.com/52'" />
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem;">${e.symbol}</div>
      </div>
      <div style="text-align: right;">
        <div class="live-price" style="font-size: 1.1rem; font-weight: 700;">${S(n)}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
          <div class="candle-pulse-dot" style="width: 6px; height: 6px; background: ${i.length>0&&i[i.length-1].isGreen?"#09C285":"#FF4D4F"}; border-radius: 50%; animation: pulse 2s infinite;"></div>
          <span class="current-candle-status" style="font-size: 0.7rem; font-weight: 600; color: ${i.length>0&&i[i.length-1].isGreen?"#09C285":"#FF4D4F"};">
            ${i.length>0&&i[i.length-1].isGreen?"GREEN":"RED"}
          </span>
        </div>
      </div>
    </div>

    <!-- Candlestick Chart -->
    <div class="candle-chart-container" style="
      height: 140px; 
      background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 100%); 
      border-radius: 12px; 
      margin-bottom: var(--spacing-lg); 
      padding: var(--spacing-md); 
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    ">
      <div class="chart-grid" style="
        position: absolute;
        inset: 12px;
        pointer-events: none;
        background: 
          repeating-linear-gradient(to bottom, transparent 0px, transparent 22px, rgba(255, 255, 255, 0.05) 22px, rgba(255, 255, 255, 0.05) 23px),
          repeating-linear-gradient(to right, transparent 0px, transparent 22px, rgba(255, 255, 255, 0.05) 22px, rgba(255, 255, 255, 0.05) 23px);
      "></div>
      <div class="candle-chart" style="display: flex; align-items: flex-end; justify-content: space-around; height: 100%; gap: 4px; position: relative; z-index: 1;">
        ${it(i)}
      </div>
    </div>

    <!-- Prediction Buttons (Yes/No style) -->
    <div style="display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
      <button class="prediction-option green-option" data-prediction="green" style="
        flex: 1;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(9, 194, 133, 0.4);
        border-radius: 12px;
        color: var(--color-text-primary);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="3">
          <path d="M12 19V5M5 12l7-7 7 7"></path>
        </svg>
        <span style="color: #09C285;">Green</span> <span style="opacity: 0.6;">${o}%</span>
      </button>
      <button class="prediction-option red-option" data-prediction="red" style="
        flex: 1;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 77, 79, 0.4);
        border-radius: 12px;
        color: var(--color-text-primary);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D4F" stroke-width="3">
          <path d="M12 5v14M5 12l7 7 7-7"></path>
        </svg>
        <span style="color: #FF4D4F;">Red</span> <span style="opacity: 0.6;">${l}%</span>
      </button>
    </div>

    <!-- Amount Input with Balance inside -->
    <div style="margin-bottom: var(--spacing-md);">
      <div style="display: flex; gap: 8px; align-items: center;">
        <div style="position: relative; flex: 1;">
          <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted);">$</span>
          <input 
            type="number" 
            class="wager-input" 
            data-token="${e.symbol}"
            placeholder="0" 
            min="1" 
            step="1"
            value=""
            style="
              width: 100%;
              padding: 10px 55px 10px 26px;
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 10px;
              color: var(--color-text-primary);
              font-size: 0.95rem;
              font-weight: 700;
              font-family: var(--font-primary);
              text-align: left;
              -webkit-appearance: none;
              -moz-appearance: textfield;
            "
          />
          <span class="balance-display" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 0.65rem; color: var(--color-text-muted); opacity: 0.7; white-space: nowrap;">${C.getState().connected?"/ $0.00":""}</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="quick-amount-btn" data-amount="5" style="
            width: 32px;
            height: 32px;
            padding: 0;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.65rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          ">+5</button>
          <button class="quick-amount-btn" data-amount="10" style="
            width: 32px;
            height: 32px;
            padding: 0;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.6rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          ">+10</button>
          <button class="quick-amount-btn" data-amount="max" style="
            width: 32px;
            height: 32px;
            padding: 0;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.55rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          ">Max</button>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <button class="submit-prediction-btn" data-token="${e.symbol}" style="
      width: 100%;
      padding: 16px;
      background: #3B82F6;
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      opacity: 0.5;
    " disabled>
      Select Green or Red
    </button>

    <!-- Prediction Info (footnote) -->
    <div style="text-align: center; margin-top: var(--spacing-sm);">
      <span style="font-size: 0.7rem; color: var(--color-text-muted); font-style: italic;">* Your prediction is for the next candle</span>
    </div>
  `;let c=null;const d=Ye(e.symbol,t,u=>{dr(a,u,e.symbol)});ce.push(d);const m=a.querySelector(".green-option"),h=a.querySelector(".red-option"),p=a.querySelector(".submit-prediction-btn"),g=a.querySelector(".wager-input");function b(){c&&parseFloat(g.value)>0?(p.disabled=!1,p.style.opacity="1",p.textContent=c==="green"?"Buy Green":"Buy Red",p.style.background=c==="green"?"#09C285":"#FF4D4F"):c?(p.disabled=!0,p.style.opacity="0.7",p.textContent="Enter amount",p.style.background="#3B82F6"):(p.disabled=!0,p.style.opacity="0.5",p.textContent="Select Green or Red",p.style.background="#3B82F6")}m.addEventListener("click",()=>{c="green",m.style.background="#09C285",m.style.border="none",m.style.color="white",m.querySelector("svg").setAttribute("stroke","white"),m.querySelector("span").style.color="white",h.style.background="rgba(255, 255, 255, 0.08)",h.style.border="1px solid rgba(255, 77, 79, 0.4)",h.style.color="var(--color-text-primary)",h.querySelector("svg").setAttribute("stroke","#FF4D4F"),h.querySelector("span").style.color="#FF4D4F",b()}),h.addEventListener("click",()=>{c="red",h.style.background="#FF4D4F",h.style.border="none",h.style.color="white",h.querySelector("svg").setAttribute("stroke","white"),h.querySelector("span").style.color="white",m.style.background="rgba(255, 255, 255, 0.08)",m.style.border="1px solid rgba(9, 194, 133, 0.4)",m.style.color="var(--color-text-primary)",m.querySelector("svg").setAttribute("stroke","#09C285"),m.querySelector("span").style.color="#09C285",b()}),g.addEventListener("input",b);const f=a.querySelector(".balance-display");let y=0;const w=async u=>{u.connected?(y=0,f.textContent=`/ $${y.toFixed(2)}`):(y=0,f.textContent="")};w(C.getState());const T=C.subscribe(w);return ce.push(T),a.querySelectorAll(".quick-amount-btn").forEach(u=>{u.addEventListener("click",()=>{const x=u.dataset.amount;if(x==="max"){if(!C.getState().connected){alert("Please connect your wallet first!");return}g.value=y||0}else{const k=parseFloat(g.value)||0;g.value=k+parseInt(x)}b()})}),p.addEventListener("click",()=>{if(c&&parseFloat(g.value)>0){const u=parseFloat(g.value);pr(e.symbol,c,e.name,r,u,p)}}),a}function it(e){if(!e||e.length===0)return'<div style="color: var(--color-text-muted); font-size: 0.875rem; width: 100%; text-align: center; display: flex; align-items: center; justify-content: center;">Loading candles...</div>';const t=e.flatMap(o=>[o.high,o.low]),r=Math.min(...t),i=Math.max(...t)-r||1,n=110,s=Math.max(4,Math.floor(120/e.length));return e.map((o,l)=>{const d=o.isGreen?"#09C285":"#FF4D4F",m=n-(o.high-r)/i*n,h=n-(o.low-r)/i*n,p=n-(o.open-r)/i*n,g=n-(o.close-r)/i*n,b=Math.min(m,Math.min(p,g)),y=h-b,w=Math.min(p,g),T=Math.max(2,Math.abs(g-p)),u=l===e.length-1,x=.5+l/e.length*.5;return`
      <div class="candle" data-index="${l}" style="
        position: relative;
        width: ${s}px;
        height: 100%;
        ${u?"animation: candlePulse 1s infinite;":""}
      ">
        <!-- Wick -->
        <div style="
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: ${b}px;
          width: 1px;
          height: ${y}px;
          background: ${d};
          opacity: ${x};
        "></div>
        <!-- Body -->
        <div style="
          position: absolute;
          left: 0;
          top: ${w}px;
          width: 100%;
          height: ${T}px;
          background: ${d};
          border-radius: 1px;
          opacity: ${x};
          ${u?"box-shadow: 0 0 8px "+d+";":""}
        "></div>
      </div>
    `}).join("")}function dr(e,t,r){const a=e.querySelector(".live-price");if(a){const l=parseFloat(a.textContent.replace(/[^0-9.-]/g,"")),c=t.close;a.textContent=S(c),l!==c&&(a.style.transition="color 0.3s",a.style.color=c>l?"#09C285":"#FF4D4F",setTimeout(()=>{a.style.color=""},500))}const i=e.querySelector(".current-candle-status"),n=e.querySelector(".current-candle-indicator"),s=e.querySelector(".candle-pulse-dot");i&&(i.textContent=t.isGreen?"GREEN":"RED",i.style.color=t.isGreen?"#09C285":"#FF4D4F"),n&&(n.style.background=t.isGreen?"rgba(9, 194, 133, 0.15)":"rgba(255, 77, 79, 0.15)"),s&&(s.style.background=t.isGreen?"#09C285":"#FF4D4F");const o=Me.get(r);if(o&&o.length>0){const l=o[o.length-1];t.openTime===l.openTime?o[o.length-1]={...l,high:Math.max(l.high,t.high),low:Math.min(l.low,t.low),close:t.close,isGreen:t.isGreen,isClosed:t.isClosed}:(t.isClosed||t.openTime>l.openTime)&&(o.push({openTime:t.openTime,open:t.open,high:t.high,low:t.low,close:t.close,closeTime:t.closeTime,isGreen:t.isGreen,isClosed:t.isClosed}),o.length>15&&o.shift());const c=e.querySelector(".candle-chart");c&&(c.innerHTML=it(o))}t.isClosed&&(console.log(`Candle closed for ${r}:`,t.isGreen?"GREEN":"RED"),hr(r,t))}async function pr(e,t,r,a,i,n){if(!C.getState().connected){alert("Please connect your wallet first!");return}if(ee.has(e)){alert("You already have an active prediction for this token. Wait for it to settle.");return}if(!i||i<=0){alert("Please enter a valid wager amount!");return}if(i<.01){alert("Minimum wager is 0.01 USDT");return}n.disabled=!0,n.innerHTML='<div class="loading"></div>';try{const o=await Dt({token:e,isGreen:t==="green",timeframe:a,wagerAmount:i}),l=Date.now(),c=a*60*1e3,d=Math.floor(l/c)*c,m=d+c*2,h={prediction:t,wagerAmount:i,targetCandleOpenTime:d+c,button:n,timerInterval:null,predictionId:o.predictionId},p=()=>{const g=m-Date.now(),f=(window.location.hash.replace("#","")||"/")==="/predict-candle";if(g<=0){clearInterval(h.timerInterval),n.innerHTML="⏳ Checking...";const u=document.getElementById(`candle-tracker-${e}`);u&&u.remove();return}const y=Math.floor(g/6e4),w=Math.floor(g%6e4/1e3),T=`${y}:${w.toString().padStart(2,"0")}`;if(f){n.innerHTML=`⏱️ ${T}`,n.style.background=t==="green"?"#09C285":"#FF4D4F";const u=document.getElementById(`candle-tracker-${e}`);u&&(u.style.display="none")}else{const u=gr(e,t,m);u.style.display="flex",ur(u,e,t,g)}};h.timerInterval=setInterval(p,1e3),p(),window.addEventListener("hashchange",p),ee.set(e,h)}catch(o){n.disabled=!1,n.innerHTML="Select Green or Red",n.style.background="#3B82F6",alert(`❌ Error: ${o.message}`)}}function mr(){const e="candle-tracker-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
        .candle-tracker-card {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            
            min-width: 220px;
            padding: 12px 20px;
            
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            animation: fadeIn 0.3s ease-out;
            color: white;
            font-family: var(--font-primary);
        }

        .candle-tracker-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            border-color: var(--color-primary);
        }

        .candle-tracker-card.pulse {
            animation: candleTrackerPulse 2s infinite;
        }

        @keyframes candleTrackerPulse {
          0% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          50% {
            box-shadow: 0 4px 25px rgba(9, 194, 133, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
        }
    `,document.head.appendChild(t)}function gr(e,t,r){const a=`candle-tracker-${e}`;let i=document.getElementById(a);return i||(mr(),i=document.createElement("div"),i.id=a,i.className="candle-tracker-card pulse",i.addEventListener("click",()=>{window.location.hash="#/predict-candle"}),document.body.appendChild(i)),i}function ur(e,t,r,a){const i=Math.floor(a/6e4),n=Math.floor(a%6e4/1e3),s=`${i}:${n.toString().padStart(2,"0")}`,o=r==="green"?"#09C285":"#FF4D4F",l=r==="green"?"↑":"↓";e.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 500;">Predict Candle</div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 0.95rem;">${t}</span>
                <span style="color: ${o}; font-weight: 700; font-size: 0.9rem;">${l} ${r.toUpperCase()}</span>
            </div>
        </div>
        <div style="font-family: monospace; font-size: 1.25rem; font-weight: 700; color: white;">
            ${s}
        </div>
    `}function hr(e,t){const r=ee.get(e);if(!r||t.openTime!==r.targetCandleOpenTime)return;if(r.timerInterval){clearInterval(r.timerInterval);const o=document.getElementById(`candle-tracker-${e}`);o&&o.remove()}const a=r.button,i=t.close>t.open,n=r.prediction==="green";i===n?(a.innerHTML="🎉 Claim Reward",a.style.background="linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",a.style.color="#000",a.disabled=!1,yr(a),a.onclick=()=>vr(e,r,a)):(a.innerHTML="❌ Lost",a.style.background="#666",a.style.opacity="0.7",setTimeout(()=>{nt(a),ee.delete(e)},3e3))}function vr(e,t,r){r.disabled=!0,r.innerHTML='<div class="loading"></div>',setTimeout(()=>{const a=(t.wagerAmount*1.9).toFixed(2);alert(`🎉 Congratulations! You won $${a} USDC!`),nt(r),ee.delete(e)},1500)}function nt(e){e.innerHTML="Select Green or Red",e.style.background="#3B82F6",e.style.color="white",e.style.opacity="0.5",e.disabled=!0,e.onclick=null}function yr(e){const t=e.closest(".card");if(!t)return;const r=document.createElement("div");r.style.cssText=`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 100;
  `,t.style.position="relative",t.appendChild(r);const a=["#FFD700","#FFA500","#09C285","#FF4D4F","#3B82F6","#FF69B4","#00FFFF"];for(let i=0;i<50;i++){const n=document.createElement("div"),s=a[Math.floor(Math.random()*a.length)],o=Math.random()*8+4,l=Math.random()*100,c=Math.random()*.5,d=Math.random()*1+1.5,m=Math.random()*360,h=(Math.random()-.5)*200;n.style.cssText=`
      position: absolute;
      width: ${o}px;
      height: ${o}px;
      background: ${s};
      left: ${l}%;
      bottom: 20%;
      border-radius: ${Math.random()>.5?"50%":"2px"};
      opacity: 1;
      transform: rotate(${m}deg);
      animation: confettiFall ${d}s ease-out ${c}s forwards;
      --x-offset: ${h}px;
    `,r.appendChild(n)}setTimeout(()=>{r.remove()},3e3)}const ot=document.createElement("style");ot.textContent=`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes candlePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes confettiFall {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg) scale(1);
      opacity: 1;
    }
    20% {
      transform: translateY(-80px) translateX(var(--x-offset, 0)) rotate(180deg) scale(1.2);
      opacity: 1;
    }
    100% {
      transform: translateY(200px) translateX(var(--x-offset, 0)) rotate(720deg) scale(0.5);
      opacity: 0;
    }
  }

  /* Hide number input spinners */
  .wager-input::-webkit-outer-spin-button,
  .wager-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .wager-input[type=number] {
    -moz-appearance: textfield;
  }

  .timeframe-btn {
    padding: 0.5rem 1.25rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-primary);
    font-weight: 600;
  }

  .timeframe-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .timeframe-btn.selected {
    background: var(--gradient-blue);
    border-color: transparent;
    color: white;
  }

  .candle-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: var(--font-primary);
  }

  .candle-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .green-btn {
    background: var(--gradient-green);
    color: white;
  }

  .green-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(9, 194, 133, 0.4);
  }

  .red-btn {
    background: linear-gradient(135deg, #FF4D4F 0%, #ff3336 100%);
    color: white;
  }

  .red-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(255, 77, 79, 0.4);
  }

  .candle-card {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .candle-chart-container {
    position: relative;
    overflow: hidden;
  }

  .candle-chart .candle {
    transition: transform 0.2s ease;
  }

  .candle-chart .candle:last-child {
    animation: candlePulse 1s infinite;
  }

  .token-price-change.positive {
    color: #09C285;
  }

  .token-price-change.negative {
    color: #FF4D4F;
  }
`;document.head.appendChild(ot);const fr=["BTC","ETH","SOL","BNB","XRP","HYPE","DOGE"],X={BTC:{name:"Bitcoin",image:"https://assets.coingecko.com/coins/images/1/small/bitcoin.png"},ETH:{name:"Ethereum",image:"https://assets.coingecko.com/coins/images/279/small/ethereum.png"},SOL:{name:"Solana",image:"https://assets.coingecko.com/coins/images/4128/small/solana.png"},BNB:{name:"BNB",image:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png"},XRP:{name:"XRP",image:"https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png"},HYPE:{name:"Hyperliquid",image:"https://assets.coingecko.com/coins/images/40845/standard/hyperliquid.jpeg"},DOGE:{name:"Dogecoin",image:"https://assets.coingecko.com/coins/images/5/small/dogecoin.png"}},oe=10,de=5;let I=[],br=[],pe=[],we=[],N=null,F=null,D=5;function xr(){N=null,F=null,D=5;const e=document.createElement("div");e.className="pvp-battle-page",e.style.cssText=`
    display: flex;
    height: calc(100vh - 64px);
    overflow: hidden;
  `;const t=document.createElement("div");t.id="pvp-main-content",t.style.cssText=`
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-xl) var(--spacing-lg);
    background: linear-gradient(135deg, rgba(9, 194, 133, 0.02) 0%, transparent 50%);
  `;const r=document.createElement("div");r.style.cssText="margin-bottom: var(--spacing-xl); text-align: center;",r.innerHTML=`
    <div style="display: inline-flex; align-items: center; justify-content: center; gap: var(--spacing-md); margin-bottom: var(--spacing-sm);">
      <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #09C285 0%, #07a371 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(9, 194, 133, 0.3);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z" />
          <path d="M5 13l6 6" />
          <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" />
          <path d="M10 5.5l-2 -2.5h-5v5l3 2.5" />
        </svg>
      </div>
      <h1 style="font-size: 2.5rem; margin: 0; background: linear-gradient(135deg, #F0F0F0 0%, #A0A0A0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        PvP Battle
      </h1>
    </div>
    <p style="color: var(--color-text-secondary); font-size: 1.1rem; max-width: 500px; margin: 0 auto;">
      Predict <span style="color: #09C285; font-weight: 600;">LONG</span> or <span style="color: #EF4444; font-weight: 600;">SHORT</span>. Find an opponent. <strong>Winner takes all!</strong>
    </p>
  `,t.appendChild(r);const a=document.createElement("div");a.id="pvp-token-grid",a.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  `,t.appendChild(a);const i=document.createElement("div");i.id="pvp-bet-slip",i.style.cssText="display: none;",t.appendChild(i),e.appendChild(t);const n=document.createElement("div");return n.id="open-bets-panel",n.style.cssText=`
    width: 360px;
    height: calc(100vh - 64px);
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-left: 1px solid rgba(9, 194, 133, 0.2);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,n.innerHTML=`
    <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-lg); padding-bottom: var(--spacing-md); border-bottom: 1px solid rgba(9, 194, 133, 0.2);">
      <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #09C285 0%, #07a371 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem;">Open Bets</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted);">Challenge other players</div>
      </div>
      <span id="open-bets-count" style="background: linear-gradient(135deg, #09C285 0%, #07a371 100%); color: white; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; box-shadow: 0 4px 12px rgba(9, 194, 133, 0.3);">0</span>
    </div>
    <div id="open-bets-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: var(--spacing-md); padding-right: 4px;"></div>
  `,e.appendChild(n),wr(a),$r(),e.addEventListener("DOMNodeRemovedFromDocument",st),e}function st(){we.forEach(e=>e()),we=[]}async function wr(e){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>',st();try{const t=await _(fr);if(t.length>0){const r=t.map(a=>{var i,n;return{symbol:a.symbol,name:((i=X[a.symbol])==null?void 0:i.name)||a.symbol,image:((n=X[a.symbol])==null?void 0:n.image)||a.image,price:a.price,priceChange24h:a.priceChange24h}});kr(r,e),r.forEach(a=>{const i=me(a.symbol,n=>{Er(a.symbol,n.price,n.priceChange24h)});we.push(i)}),console.log("🟢 PvP Tokens loaded with real-time updates")}else throw new Error("No tokens loaded")}catch(t){console.error("Failed to load PvP tokens:",t),e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `}}function kr(e,t){t.innerHTML="",e.forEach(r=>{const a=Tr(r);a.addEventListener("click",()=>Cr(r)),t.appendChild(a)})}function Tr(e){const t=document.createElement("div");t.className="pvp-token-card",t.dataset.symbol=e.symbol;const r=R(e.priceChange24h);return t.style.cssText=`
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: var(--spacing-lg);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-sm);
    position: relative;
    overflow: hidden;
  `,t.innerHTML=`
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(9, 194, 133, 0.08) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s;" class="card-glow"></div>
    <img src="${e.image}" alt="${e.name}" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'" />
    <div>
      <div style="font-weight: 700; font-size: 1.1rem; letter-spacing: 0.5px;">${e.symbol}</div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted);">${e.name}</div>
    </div>
    <div style="margin-top: var(--spacing-xs);">
      <div class="token-price" style="font-weight: 600; font-size: 1rem;">${S(e.price)}</div>
      <div class="token-change ${r}" style="font-size: 0.85rem; font-weight: 500;">${U(e.priceChange24h)}</div>
    </div>
  `,t.addEventListener("mouseenter",()=>{t.classList.contains("selected")||(t.style.borderColor="rgba(9, 194, 133, 0.5)",t.style.transform="translateY(-4px)",t.style.boxShadow="0 12px 40px rgba(9, 194, 133, 0.15)",t.querySelector(".card-glow").style.opacity="1")}),t.addEventListener("mouseleave",()=>{t.classList.contains("selected")||(t.style.borderColor="rgba(255, 255, 255, 0.08)",t.style.transform="none",t.style.boxShadow="none",t.querySelector(".card-glow").style.opacity="0")}),t}function Er(e,t,r){const a=document.querySelector(`.pvp-token-card[data-symbol="${e}"]`);if(!a)return;const i=a.querySelector(".token-price"),n=a.querySelector(".token-change");i&&(i.textContent=S(t)),n&&(n.textContent=U(r),n.className=`token-change ${R(r)}`)}function Cr(e){N=e,F=null,document.querySelectorAll(".pvp-token-card").forEach(t=>{const r=t.querySelector(".card-glow");t.dataset.symbol===e.symbol?(t.classList.add("selected"),t.style.borderColor="#09C285",t.style.boxShadow="0 0 30px rgba(9, 194, 133, 0.4), inset 0 0 20px rgba(9, 194, 133, 0.05)",r&&(r.style.opacity="1")):(t.classList.remove("selected"),t.style.borderColor="rgba(255, 255, 255, 0.08)",t.style.boxShadow="none",r&&(r.style.opacity="0"))}),Sr(e)}function Sr(e){const t=document.getElementById("pvp-bet-slip");if(!t)return;const r=R(e.priceChange24h);t.style.cssText=`
    display: block;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    max-width: 400px;
    margin: 0 auto;
    animation: slideUp 0.3s ease-out;
  `,t.innerHTML=`
    <style>
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .direction-btn {
        flex: 1;
        padding: var(--spacing-md);
        border: 2px solid var(--glass-border);
        border-radius: var(--radius-lg);
        background: transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        color: var(--color-text-primary);
      }
      .direction-btn:hover {
        transform: translateY(-2px);
      }
      .direction-btn.up:hover, .direction-btn.up.selected {
        border-color: #09C285;
        background: rgba(9, 194, 133, 0.1);
        color: #09C285;
      }
      .direction-btn.down:hover, .direction-btn.down.selected {
        border-color: #EF4444;
        background: rgba(239, 68, 68, 0.1);
        color: #EF4444;
      }
      .direction-btn.selected {
        transform: scale(1.02);
      }
      .amount-input {
        width: 100%;
        padding: var(--spacing-md);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-secondary);
        color: var(--color-text-primary);
        font-size: 1.2rem;
        text-align: center;
        font-weight: 600;
      }
      .amount-input:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    </style>

    <div style="text-align: center; margin-bottom: var(--spacing-lg);">
      <img src="${e.image}" alt="${e.symbol}" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: var(--spacing-sm);" onerror="this.style.display='none'" />
      <h3 style="margin: 0; font-size: 1.3rem;">${e.symbol}</h3>
      <div style="color: var(--color-text-muted); font-size: 0.9rem;">${e.name}</div>
      <div style="margin-top: var(--spacing-xs);">
        <span style="font-weight: 600;">${S(e.price)}</span>
        <span class="${r}" style="margin-left: var(--spacing-xs);">${U(e.priceChange24h)}</span>
      </div>
    </div>

    <div style="margin-bottom: var(--spacing-md);">
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Predict Direction (${de} min)</div>
      <div style="display: flex; gap: var(--spacing-sm);">
        <button class="direction-btn up" data-direction="up">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          <span style="font-weight: 600;">LONG</span>
        </button>
        <button class="direction-btn down" data-direction="down">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M5 12l7 7 7-7"></path>
          </svg>
          <span style="font-weight: 600;">SHORT</span>
        </button>
      </div>
    </div>

    <div style="margin-bottom: var(--spacing-lg);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Bet Amount</span>
        <span style="font-size: 0.75rem; color: var(--color-text-muted);">Max: $${oe}</span>
      </div>
      <div style="position: relative;">
        <span style="position: absolute; left: var(--spacing-md); top: 50%; transform: translateY(-50%); color: var(--color-text-muted); font-size: 1.2rem;">$</span>
        <input type="number" class="amount-input" id="bet-amount-input" value="${D}" min="1" max="${oe}" step="1" style="padding-left: 2rem;" />
      </div>
      <div style="display: flex; gap: var(--spacing-xs); margin-top: var(--spacing-xs);">
        ${[1,5,10].map(s=>`
          <button class="quick-amount-btn" data-amount="${s}" style="flex: 1; padding: var(--spacing-xs); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); background: transparent; cursor: pointer; color: var(--color-text-secondary); font-size: 0.85rem; transition: all 0.2s;">
            $${s}
          </button>
        `).join("")}
      </div>
    </div>

    <button id="submit-bet-btn" class="btn btn-primary" style="width: 100%; padding: var(--spacing-md); font-size: 1rem;" disabled>
      Select Direction
    </button>

    <div style="text-align: center; margin-top: var(--spacing-sm);">
      <span style="font-size: 0.8rem; color: var(--color-text-muted);">Winner takes all • ${de} min duration</span>
    </div>
  `,t.querySelectorAll(".direction-btn").forEach(s=>{s.addEventListener("click",()=>{F=s.dataset.direction,t.querySelectorAll(".direction-btn").forEach(o=>o.classList.remove("selected")),s.classList.add("selected"),n()})});const a=t.querySelector("#bet-amount-input");a.addEventListener("input",s=>{let o=parseFloat(s.target.value);o>oe&&(o=oe),o<1&&(o=1),D=o,n()}),t.querySelectorAll(".quick-amount-btn").forEach(s=>{s.addEventListener("click",()=>{D=parseFloat(s.dataset.amount),a.value=D,n()})});const i=t.querySelector("#submit-bet-btn");i.addEventListener("click",Mr);function n(){F&&D>0?(i.disabled=!1,i.textContent=`Place ${F.toUpperCase()} Bet ($${D})`):(i.disabled=!0,i.textContent="Select Direction")}}async function Mr(){var r;const e=C.getState();if(!e.connected){alert("Please connect your wallet first!");return}if(!N||!F||D<=0)return;const t=document.getElementById("submit-bet-btn");t.disabled=!0,t.innerHTML='<div class="loading"></div> Submitting...';try{await new Promise(s=>setTimeout(s,800));const a={id:Date.now().toString(),symbol:N.symbol,name:N.name,image:N.image,direction:F,amount:D,startPrice:null,timestamp:Date.now(),user:e.address.slice(0,6)+"..."+e.address.slice(-4),status:"open"},i=F==="up"?"down":"up",n=I.find(s=>s.symbol===a.symbol&&s.direction===i&&s.amount===a.amount&&s.status==="open");if(n){let s;try{s=((r=(await _([a.symbol]))[0])==null?void 0:r.price)||N.price}catch{s=N.price}n.status="matched",n.startPrice=s,a.status="matched",a.startPrice=s;const o={id:Date.now().toString(),player1:n,player2:a,startTime:Date.now(),endTime:Date.now()+de*60*1e3,symbol:a.symbol,startPrice:s};pe.push(o),I=I.filter(l=>l.id!==n.id),lt(o),ct(o)}else I.unshift(a),br.push(a),Pr(a);$e(),N=null,F=null,document.querySelectorAll(".pvp-token-card").forEach(s=>{s.classList.remove("selected"),s.style.borderColor="var(--glass-border)",s.style.boxShadow="none"}),document.getElementById("pvp-bet-slip").style.display="none"}catch(a){alert(`Error: ${a.message}`),t.disabled=!1,t.textContent=`Place ${F.toUpperCase()} Bet ($${D})`}}function $r(){I=[{id:"1",symbol:"BTC",name:"Bitcoin",image:X.BTC.image,direction:"up",amount:5,startPrice:0,timestamp:Date.now()-12e4,user:"0x1a2b...3c4d",status:"open"},{id:"2",symbol:"ETH",name:"Ethereum",image:X.ETH.image,direction:"down",amount:10,startPrice:0,timestamp:Date.now()-6e4,user:"0x5e6f...7g8h",status:"open"},{id:"3",symbol:"SOL",name:"Solana",image:X.SOL.image,direction:"up",amount:5,startPrice:0,timestamp:Date.now()-3e4,user:"0x9i0j...1k2l",status:"open"}],$e()}function $e(){const e=document.getElementById("open-bets-list"),t=document.getElementById("open-bets-count");if(!e)return;const r=I.filter(a=>a.status==="open");if(t&&(t.textContent=r.length),r.length===0){e.innerHTML=`
      <div style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--spacing-sm); opacity: 0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
        <div>No open bets yet</div>
        <div style="font-size: 0.85rem; margin-top: var(--spacing-xs);">Be the first to place a bet!</div>
      </div>
    `;return}e.innerHTML=r.map(a=>{const i=zr(a.timestamp),n=a.direction==="up",s=n?"#09C285":"#EF4444",o=n?"↑":"↓",l=n?"LONG":"SHORT";return`
      <div class="open-bet-card" data-bet-id="${a.id}" style="
        background: var(--color-bg-secondary);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-sm) var(--spacing-md);
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-xs);">
          <img src="${a.image}" alt="${a.symbol}" style="width: 28px; height: 28px; border-radius: 50%;" onerror="this.style.display='none'" />
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 0.9rem;">${a.symbol}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">${a.user}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: ${s}; display: flex; align-items: center; gap: 4px;">
              <span>${o}</span>
              <span>${l}</span>
            </div>
            <div style="font-size: 0.85rem; font-weight: 600;">$${a.amount}</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; color: var(--color-text-muted);">${i}</span>
          <button class="accept-bet-btn" data-bet-id="${a.id}" style="
            padding: 4px 12px;
            font-size: 0.8rem;
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-weight: 600;
          ">Accept (${n?"SHORT":"LONG"})</button>
        </div>
      </div>
    `}).join(""),e.querySelectorAll(".open-bet-card").forEach(a=>{a.addEventListener("mouseenter",()=>{a.style.borderColor="var(--color-primary)",a.style.transform="translateX(-4px)"}),a.addEventListener("mouseleave",()=>{a.style.borderColor="var(--glass-border)",a.style.transform="none"})}),e.querySelectorAll(".accept-bet-btn").forEach(a=>{a.addEventListener("click",i=>{i.stopPropagation(),Lr(a.dataset.betId)})})}async function Lr(e){var a;const t=C.getState();if(!t.connected){alert("Please connect your wallet first!");return}const r=I.find(i=>i.id===e);if(!(!r||r.status!=="open"))try{const n=((a=(await _([r.symbol]))[0])==null?void 0:a.price)||r.startPrice,s={id:Date.now().toString(),symbol:r.symbol,name:r.name,image:r.image,direction:r.direction==="up"?"down":"up",amount:r.amount,startPrice:n,timestamp:Date.now(),user:t.address.slice(0,6)+"..."+t.address.slice(-4),status:"matched"};r.status="matched",r.startPrice=n;const o={id:Date.now().toString(),player1:r,player2:s,startTime:Date.now(),endTime:Date.now()+de*60*1e3,symbol:r.symbol,startPrice:n};pe.push(o),I=I.filter(l=>l.id!==e),lt(o),ct(o),$e()}catch(i){alert(`Error accepting bet: ${i.message}`)}}function lt(e){const t=document.createElement("div");t.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    text-align: center;
    z-index: 1000;
    animation: matchPop 0.5s ease-out;
    min-width: 300px;
  `,t.innerHTML=`
    <style>
      @keyframes matchPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
    </style>
    <div style="font-size: 3rem; margin-bottom: var(--spacing-sm);">⚔️</div>
    <h2 style="color: var(--color-primary); margin-bottom: var(--spacing-xs);">MATCHED!</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
      Battle starts now for ${e.symbol}
    </p>
    <div style="display: flex; justify-content: center; gap: var(--spacing-lg); margin-bottom: var(--spacing-md);">
      <div>
        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${e.player1.user}</div>
        <div style="font-weight: 700; color: ${e.player1.direction==="up"?"#09C285":"#EF4444"};">
          ${e.player1.direction==="up"?"↑ LONG":"↓ SHORT"}
        </div>
      </div>
      <div style="font-size: 1.5rem; font-weight: 700;">VS</div>
      <div>
        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${e.player2.user}</div>
        <div style="font-weight: 700; color: ${e.player2.direction==="up"?"#09C285":"#EF4444"};">
          ${e.player2.direction==="up"?"↑ LONG":"↓ SHORT"}
        </div>
      </div>
    </div>
    <div style="font-size: 0.9rem; color: var(--color-text-muted);">
      Prize Pool: <strong style="color: var(--color-primary);">$${e.player1.amount+e.player2.amount}</strong>
    </div>
  `,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}function Pr(e){const t=document.createElement("div");t.style.cssText=`
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md) var(--spacing-lg);
    z-index: 1000;
    animation: slideUpNotif 0.3s ease-out;
  `,t.innerHTML=`
    <style>
      @keyframes slideUpNotif {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
    </style>
    <div style="display: flex; align-items: center; gap: var(--spacing-md);">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div>
        <div style="font-weight: 600;">Bet Placed!</div>
        <div style="font-size: 0.85rem; color: var(--color-text-muted);">Waiting for opponent...</div>
      </div>
    </div>
  `,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}function ct(e){const t=document.createElement("div");t.id=`battle-tracker-${e.id}`,t.style.cssText=`
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    z-index: 999;
    min-width: 240px;
    animation: fadeIn 0.3s ease-out;
  `,document.body.appendChild(t);const r=async()=>{var c;const a=e.endTime-Date.now();if(a<=0){await Br(e,t);return}const i=Math.floor(a/6e4),n=Math.floor(a%6e4/1e3);let s=e.startPrice;try{s=((c=(await _([e.symbol]))[0])==null?void 0:c.price)||e.startPrice}catch{}const o=(s-e.startPrice)/e.startPrice*100,l=o>=0;t.innerHTML=`
      <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
        <span style="font-size: 1.2rem;">⚔️</span>
        <span style="font-weight: 600;">${e.symbol} Battle</span>
        <span style="margin-left: auto; font-family: monospace; font-weight: 600;">${i}:${n.toString().padStart(2,"0")}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-text-muted);">
        <span>Start: ${S(e.startPrice)}</span>
        <span style="color: ${l?"#09C285":"#EF4444"}; font-weight: 600;">
          Now: ${S(s)} (${l?"+":""}${o.toFixed(2)}%)
        </span>
      </div>
      <div style="margin-top: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--glass-border); display: flex; justify-content: space-between; font-size: 0.8rem;">
        <span style="color: ${e.player1.direction==="up"?"#09C285":"#EF4444"};">${e.player1.user}: ${e.player1.direction.toUpperCase()}</span>
        <span style="color: ${e.player2.direction==="up"?"#09C285":"#EF4444"};">${e.player2.user}: ${e.player2.direction.toUpperCase()}</span>
      </div>
    `,setTimeout(r,1e3)};r()}async function Br(e,t){var l;let r=e.startPrice;try{r=((l=(await _([e.symbol]))[0])==null?void 0:l.price)||e.startPrice}catch{}const a=(r-e.startPrice)/e.startPrice*100,i=a>0,n=a<0;let s=null;a===0||(e.player1.direction==="up"&&i||e.player1.direction==="down"&&n?(s=e.player1,e.player2):(s=e.player2,e.player1));const o=e.player1.amount+e.player2.amount;t.innerHTML=`
    <div style="text-align: center; padding: var(--spacing-sm);">
      <div style="font-size: 2rem; margin-bottom: var(--spacing-xs);">${s?"🏆":"🤝"}</div>
      <div style="font-weight: 700; font-size: 1.1rem; color: ${s?"var(--color-primary)":"var(--color-text-primary)"};">
        ${s?`${s.user} WINS!`:"IT'S A TIE!"}
      </div>
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin: var(--spacing-xs) 0;">
        ${e.symbol}: ${S(e.startPrice)} → ${S(r)}
        <span style="color: ${a>=0?"#09C285":"#EF4444"};">(${a>=0?"+":""}${a.toFixed(2)}%)</span>
      </div>
      ${s?`
        <div style="font-weight: 600; color: var(--color-primary);">
          Prize: $${o}
        </div>
      `:""}
      <button onclick="this.parentElement.parentElement.remove()" style="
        margin-top: var(--spacing-sm);
        padding: var(--spacing-xs) var(--spacing-md);
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 600;
      ">Close</button>
    </div>
  `,pe=pe.filter(c=>c.id!==e.id)}function zr(e){const t=Math.floor((Date.now()-e)/1e3);if(t<60)return`${t}s ago`;const r=Math.floor(t/60);return r<60?`${r}m ago`:`${Math.floor(r/60)}h ago`}let L=null;function Ar(){return L=document.createElement("div"),L.id="pending-action-widget",L.innerHTML=`
    <div class="pending-widget-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <span class="pending-widget-text">Pending Dream Team Selection</span>
    <span class="pending-widget-badge">0</span>
  `,Nr(),L.addEventListener("click",Dr),Wt(ke),ke(),document.body.appendChild(L),L}function Dr(){re().length===15?Fe(!0):Fe(!1),ae("/dream-team"),L&&(L.style.display="none")}function ke(e){if(!L)return;const t=Array.isArray(e)?e:re(),a=(window.location.hash.replace("#","")||"/")==="/dream-team";if(t.length>0&&!a){L.style.display="flex",L.classList.add("pulse");const i=L.querySelector(".pending-widget-badge");i&&(i.textContent=t.length);const n=L.querySelector(".pending-widget-text");n&&(t.length===15?(n.textContent="Dream Team Ready to Submit",i.style.background="#09C285"):(n.textContent="Pending Dream Team Selection",i.style.background="var(--color-primary)"))}else L.style.display="none",L.classList.remove("pulse")}function Fr(){ke()}function Nr(){const e="pending-widget-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
    #pending-action-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      
      display: none;
      align-items: center;
      gap: 12px;
      
      padding: 12px 20px;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #pending-action-widget:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      border-color: var(--color-primary);
      background: rgba(15, 23, 42, 0.9);
    }
    
    .pending-widget-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary);
    }
    
    .pending-widget-text {
      font-family: var(--font-primary);
      font-weight: 600;
      font-size: 0.95rem;
      color: #fff;
    }

    .pending-widget-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
      background: var(--color-primary);
      color: white;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 700;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    #pending-action-widget.pulse {
      animation: widgetPulse 2s infinite;
    }

    @keyframes widgetPulse {
      0% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      }
      50% {
        box-shadow: 0 4px 25px rgba(9, 194, 133, 0.4);
      }
      100% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      }
    }
  `,document.head.appendChild(t)}let K=null,W=null,B=null,Z=null;function Ir(){const e=document.createElement("div");return e.className="app",Z=bt(),e.appendChild(Z),W=document.createElement("div"),W.className="app-container",K=xt(),W.appendChild(K),B=document.createElement("main"),B.className="main-content",B.style.minHeight="calc(100vh - 64px)",W.appendChild(B),e.appendChild(W),Ar(),He(B),setTimeout(()=>wt(),0),window.addEventListener("popstate",()=>{He(B),Fr()}),window.addEventListener("navigate",t=>{const r=t.detail.page;ae(`/${r}`)}),e}function He(e){e.innerHTML="";const t=window.location.hash.slice(1)||"/",r=["/crypto-duel","/dream-team","/time-based","/predict-candle","/pvp-battle"].includes(t);Z&&(t==="/"?Z.classList.add("home-transparent"):Z.classList.remove("home-transparent")),K&&(r?(K.style.display="flex",B&&(B.style.marginLeft="",B.style.width="")):(K.style.display="none",B&&(B.style.marginLeft="0",B.style.width="100%")));let a;switch(t){case"/":a=kt();break;case"/crypto-duel":a=Ft();break;case"/dream-team":a=Xt();break;case"/time-based":a=Jt();break;case"/predict-candle":a=lr();break;case"/pvp-battle":a=xr();break;default:a=Or()}e.appendChild(a),window.scrollTo(0,0)}function Or(){const e=document.createElement("div");return e.className="container",e.style.cssText="text-align: center; padding: var(--spacing-3xl);",e.innerHTML=`
    <h1 style="font-size: 4rem; margin-bottom: var(--spacing-md);">404</h1>
    <p style="font-size: 1.5rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-xl);">
      Page not found
    </p>
    <a href="#/" class="btn btn-primary">Go Home</a>
  `,e}function ae(e){window.location.hash=e,window.dispatchEvent(new PopStateEvent("popstate"))}async function Ue(){console.log("🚀 Initializing Crypto Leagues...");try{await C.autoConnect()}catch{console.log("No previous wallet connection found")}const e=Ir(),t=document.getElementById("app");t?t.appendChild(e):console.error("App container not found!"),console.log("✅ Crypto Leagues initialized")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ue):Ue();
//# sourceMappingURL=index-B_46gCCI.js.map
