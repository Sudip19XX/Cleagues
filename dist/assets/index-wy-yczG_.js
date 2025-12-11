import{_ as ue}from"./wallet-evm-D7HrI6pR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();function mt(e,t=6,r=4){return e?e.length<=t+r?e:`${e.slice(0,t)}...${e.slice(-r)}`:""}function B(e,t={}){const{currency:r="USD",minimumFractionDigits:n=2,maximumFractionDigits:a=6,compact:i=!1}=t;return e==null?"$0.00":i&&Math.abs(e)>=1e3?Ht(e,{prefix:"$"}):new Intl.NumberFormat("en-US",{style:"currency",currency:r,minimumFractionDigits:n,maximumFractionDigits:a}).format(e)}function Z(e,t=2){return e==null?"0.00%":`${e>=0?"+":""}${e.toFixed(t)}%`}function Ht(e,t={}){const{decimals:r=2,prefix:n="",suffix:a=""}=t;if(e==null)return`${n}0${a}`;const i=Math.abs(e),c=e<0?"-":"";return i>=1e9?`${c}${n}${(e/1e9).toFixed(r)}B${a}`:i>=1e6?`${c}${n}${(e/1e6).toFixed(r)}M${a}`:i>=1e3?`${c}${n}${(e/1e3).toFixed(r)}K${a}`:`${c}${n}${e.toFixed(r)}${a}`}function J(e){return e>0?"positive":e<0?"negative":"neutral"}const A={EVM:"evm",SOLANA:"solana"},ke={ETHEREUM:{id:1},POLYGON:{id:137},ARBITRUM:{id:42161},BASE:{id:8453}},tt={[ke.ETHEREUM.id]:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",[ke.POLYGON.id]:"0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",[ke.ARBITRUM.id]:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",[ke.BASE.id]:"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",SOLANA:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},re={CRYPTO_DUEL:{name:"Crypto Duel",description:"Select two distinct tokens and predict which will outperform the other in real-time. It's a battle of relative strength—choose the stronger contender to claim victory.",path:"/crypto-duel",icon:`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`}},Y={ONE_MIN:{hours:1/60,label:"1M",minutes:1},TEN_MINS:{hours:10/60,label:"10M",minutes:10},THIRTY_MINS:{hours:.5,label:"30M",minutes:30},ONE_HOUR:{hours:1,label:"1H",minutes:60},FOUR_HOURS:{hours:4,label:"4H",minutes:240},ONE_DAY:{hours:24,label:"1D",minutes:1440}},ut={COINGECKO_MARKETS:"https://api.coingecko.com/api/v3/coins/markets",COINGECKO_PRICE:"https://api.coingecko.com/api/v3/simple/price"},yt={WALLET_PREFERENCE:"crypto_leagues_wallet_pref"};function Rt(e,t=null){try{const r=localStorage.getItem(e);return r?JSON.parse(r):t}catch(r){return console.error(`Error reading from localStorage (${e}):`,r),t}}function jt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(r){console.error(`Error writing to localStorage (${e}):`,r)}}function qt(){return Rt(yt.WALLET_PREFERENCE)}function Fe(e){jt(yt.WALLET_PREFERENCE,e)}class _t{constructor(){this.currentChain=null,this.address=null,this.provider=null,this.listeners=[]}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(r=>r!==t)}}notify(){const t=this.getState();this.listeners.forEach(r=>r(t))}getState(){return{chain:this.currentChain,address:this.address,connected:!!this.address,provider:this.provider}}async connectEVM(){try{if(!window.ethereum)throw new Error("No Ethereum wallet found. Please install MetaMask.");const t=await window.ethereum.request({method:"eth_requestAccounts"});if(t.length===0)throw new Error("No accounts found");return this.currentChain=A.EVM,this.address=t[0],this.provider=window.ethereum,this.setupEVMListeners(),Fe({chain:A.EVM,address:this.address}),this.notify(),{success:!0,address:this.address,chain:this.currentChain}}catch(t){throw console.error("Error connecting to EVM wallet:",t),t}}async connectSolana(){try{if(!window.solana||!window.solana.isPhantom)throw new Error("No Solana wallet found. Please install Phantom.");const t=await window.solana.connect();return this.currentChain=A.SOLANA,this.address=t.publicKey.toString(),this.provider=window.solana,this.setupSolanaListeners(),Fe({chain:A.SOLANA,address:this.address}),this.notify(),{success:!0,address:this.address,chain:this.currentChain}}catch(t){throw console.error("Error connecting to Solana wallet:",t),t}}async disconnect(){this.currentChain===A.SOLANA&&window.solana&&await window.solana.disconnect(),this.currentChain=null,this.address=null,this.provider=null,Fe(null),this.notify()}setupEVMListeners(){window.ethereum&&(window.ethereum.on("accountsChanged",t=>{t.length===0?this.disconnect():(this.address=t[0],this.notify())}),window.ethereum.on("chainChanged",()=>{window.location.reload()}),window.ethereum.on("disconnect",()=>{this.disconnect()}))}setupSolanaListeners(){window.solana&&(window.solana.on("accountChanged",t=>{t?(this.address=t.toString(),this.notify()):this.disconnect()}),window.solana.on("disconnect",()=>{this.disconnect()}))}async getBalance(){if(!this.address)return"0";try{if(this.currentChain===A.EVM&&window.ethereum){const t=await window.ethereum.request({method:"eth_getBalance",params:[this.address,"latest"]});return(parseInt(t,16)/1e18).toFixed(4)}else if(this.currentChain===A.SOLANA&&window.solana)return"0"}catch(t){return console.error("Error getting balance:",t),"0"}}async getUSDCBalance(){if(!this.address)return"0.00";try{if(this.currentChain===A.EVM&&window.ethereum){const t=await window.ethereum.request({method:"eth_chainId"}),r=parseInt(t,16),n=tt[r];if(!n)return console.warn(`USDC address not found for chain ID: ${r}`),"0.00";const i="0x70a08231"+this.address.substring(2).padStart(64,"0"),c=await window.ethereum.request({method:"eth_call",params:[{to:n,data:i},"latest"]});if(c==="0x")return"0.00";const o=BigInt(c);return(Number(o)/1e6).toFixed(2)}else if(this.currentChain===A.SOLANA){const r=await(await fetch("https://api.mainnet-beta.solana.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"getTokenAccountsByOwner",params:[this.address,{mint:tt.SOLANA},{encoding:"jsonParsed"}]})})).json();return r.result&&r.result.value&&r.result.value.length>0&&r.result.value[0].account.data.parsed.info.tokenAmount.uiAmountString||"0.00"}}catch(t){return console.error("Error fetching USDC balance:",t),"0.00"}return"0.00"}async signMessage(t){if(!this.address)throw new Error("No wallet connected");try{if(this.currentChain===A.EVM&&window.ethereum)return await window.ethereum.request({method:"personal_sign",params:[t,this.address]});if(this.currentChain===A.SOLANA&&window.solana){const r=new TextEncoder().encode(t);return(await window.solana.signMessage(r,"utf8")).signature}}catch(r){throw console.error("Error signing message:",r),r}}async autoConnect(){const t=qt();if(!t)return!1;try{if(t.chain===A.EVM)return await this.connectEVM(),!0;if(t.chain===A.SOLANA)return await this.connectSolana(),!0}catch(r){return console.error("Auto-connect failed:",r),!1}}}const M=new _t;function Gt(e){const t=document.createElement("button");t.className="wallet-button",t.innerHTML=`
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
    </svg>
    <span class="wallet-text">Connect Wallet</span>
  `;const r=n=>{n.connected?(t.innerHTML=`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="wallet-address">${mt(n.address)}</span>
      `,t.classList.add("connected")):(t.innerHTML=`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>
        <span class="wallet-text">Connect Wallet</span>
      `,t.classList.remove("connected"))};return M.subscribe(r),r(M.getState()),t.addEventListener("click",()=>{M.getState().connected?Vt(t):Wt()}),e.appendChild(t),t}function Wt(){const e=document.createElement("div");e.className="modal-overlay",e.style.animation="fadeIn 0.2s ease-out";const t=document.createElement("div");t.className="modal",t.style.maxWidth="400px",t.innerHTML=`
    <button class="modal-close">×</button>
    <h2 class="modal-title">Connect Wallet</h2>
    <div class="modal-body">
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
        Choose your preferred blockchain to get started
      </p>
      
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        <button class="wallet-option" data-chain="${A.EVM}">
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

        <button class="wallet-option" data-chain="${A.SOLANA}">
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
  `,e.appendChild(t),document.body.appendChild(e),t.querySelector(".modal-close").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",a=>{a.target===e&&e.remove()}),t.querySelectorAll(".wallet-option").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.chain;a.innerHTML='<div class="loading"></div> Connecting...',a.disabled=!0;try{i===A.EVM?await M.connectEVM():i===A.SOLANA&&await M.connectSolana(),e.remove()}catch(c){alert(c.message),a.disabled=!1,location.reload()}})})}function Vt(e){const t=e.querySelector(".wallet-menu");if(t){t.remove();return}const r=document.createElement("div");r.className="wallet-menu";const n=e.offsetWidth;r.style.cssText=`
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background: var(--color-bg-secondary);
    border: 1px solid var(--glass-border);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    padding: var(--spacing-xs);
    width: ${n}px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: fadeIn 0.15s ease-out;
  `;const a=M.getState(),i=a.chain===A.EVM?"EVM":"SOL",c=a.chain===A.EVM?"#E2761B":"#9945FF";r.innerHTML=`
    <!-- Network tag centered -->
    <div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs); padding: var(--spacing-sm) var(--spacing-md);">
      <span style="font-size: 0.7rem; color: ${c}; background: ${c}20; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${i}</span>
      <span style="width: 6px; height: 6px; background: #09C285; border-radius: 50%;"></span>
    </div>
    
    <!-- Address with copy button -->
    <div class="wallet-menu-item" style="padding: var(--spacing-xs) var(--spacing-md); display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs);">
      <span style="font-size: 0.8rem; font-family: monospace; color: var(--color-text-secondary);">${mt(a.address)}</span>
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
  `,e.style.position="relative",e.appendChild(r),r.querySelector("#copy-address").addEventListener("click",o=>{o.stopPropagation(),navigator.clipboard.writeText(a.address);const s=r.querySelector("#copy-address");s.innerHTML=`
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `,setTimeout(()=>{s.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `},1500)}),r.querySelector("#disconnect-wallet").addEventListener("click",async()=>{await M.disconnect(),r.remove()}),setTimeout(()=>{document.addEventListener("click",function o(s){!r.contains(s.target)&&s.target!==e&&(r.remove(),document.removeEventListener("click",o))})},0)}const ht=document.createElement("style");ht.textContent=`
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
`;document.head.appendChild(ht);function Yt(){const e=document.createElement("header");e.className="header";const t=document.createElement("div");t.className="header-container",t.style.position="relative";const r=document.createElement("a");r.href="#/",r.className="logo",r.innerHTML=`
    <img class="logo-icon" src="/assets/logo.png" alt="Crypto Leagues" width="36" height="36" style="object-fit: contain;" />
    <div class="logo-text">
      <div><span class="logo-first-letter">C</span>RYPTO</div>
      <div><span class="logo-first-letter">L</span>EAGUES</div>
    </div>
  `,r.addEventListener("click",s=>{s.preventDefault(),oe("/")});const n=document.createElement("nav");n.className="nav",n.style.display="none",n.style.gap="24px",n.style.alignItems="center",n.style.position="absolute",n.style.left="50%",n.style.transform="translateX(-50%)",n.style.margin="0";const a=[{label:"Leaderboard",path:"/leaderboard"},{label:"Picks",path:"/picks"},{label:"Rewards",path:"/rewards"}];a.forEach((s,l)=>{const d=document.createElement("a");d.href=`#${s.path}`,d.textContent=s.label,d.className="nav-link",d.style.cssText=`
        color: var(--color-text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        text-transform: capitalize;
        display: inline-block; /* Required for transform */
    `,d.addEventListener("mouseenter",()=>{d.style.color="#fff",d.style.transform="scale(1.05)"}),d.addEventListener("mouseleave",()=>{d.style.color="var(--color-text-secondary)",d.style.transform="scale(1)",(window.location.hash.replace("#","")||"/")===s.path&&(d.style.color="#fff")});const p=()=>{(window.location.hash.replace("#","")||"/")===s.path?(d.style.color="#fff",d.style.fontWeight="600"):(d.style.color="var(--color-text-secondary)",d.style.fontWeight="500")};if(window.addEventListener("hashchange",p),setTimeout(p,0),d.addEventListener("click",g=>{g.preventDefault(),oe(s.path)}),n.appendChild(d),l<a.length-1){const g=document.createElement("div");g.style.cssText=`
            width: 1px;
            height: 16px;
            background: rgba(255, 255, 255, 0.15);
        `,n.appendChild(g)}});const i=()=>{const s=window.location.hash.replace("#","")||"/";s==="/"||s===""||s==="/home"?n.style.display="none":n.style.display="flex"};window.addEventListener("hashchange",i),setTimeout(i,0);const c=document.createElement("div");return c.style.display="flex",c.style.alignItems="center",c.style.gap="var(--spacing-md)",Gt(c),localStorage.getItem("darkMode")!=="false"?(document.documentElement.classList.add("dark-mode"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark-mode"),document.body.classList.remove("dark-mode")),t.appendChild(r),t.appendChild(n),t.appendChild(c),e.appendChild(t),e}function Xt(){const e=document.createElement("aside");return e.id="sidebar",e.className="sidebar",e.innerHTML=`
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
            </svg>
            <span style="white-space: nowrap; font-size: 0.85rem;">Prediction</span>
          </div>
          
          <div class="sidebar-links">
            <a href="#prediction-market" class="sidebar-link" data-page="prediction-market">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <span>Trending Bets</span>
            </a>
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
  `,e}function Kt(){const e=document.querySelectorAll(".sidebar-link");e.forEach(r=>{r.addEventListener("click",n=>{n.preventDefault(),e.forEach(i=>i.classList.remove("active")),r.classList.add("active");const a=r.dataset.page;window.dispatchEvent(new CustomEvent("navigate",{detail:{page:a}}))})});const t=()=>{let r=window.location.hash.slice(1)||"home";r.startsWith("/")&&(r=r.slice(1)),e.forEach(a=>a.classList.remove("active"));const n=document.querySelector(`.sidebar-link[data-page="${r}"]`);n&&n.classList.add("active")};t(),window.addEventListener("hashchange",t),window.addEventListener("popstate",t)}function Zt(){const e=document.createElement("div");e.className="home-page";const t=ar();e.appendChild(t);const r=Jt();e.appendChild(r);const n=Qt();e.appendChild(n);const a=nr();e.appendChild(a);const i=ir();e.appendChild(i);const c=or();return e.appendChild(c),e}function Jt(){const e=document.createElement("section");e.style.cssText=`
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
  `,e.appendChild(t),setTimeout(()=>{const r=e.querySelector("#get-started"),n=e.querySelector("#learn-more");r==null||r.addEventListener("click",()=>{oe("/dream-team")}),n==null||n.addEventListener("click",()=>{alert("Crypto Leagues is a Web3 fantasy trading platform where you can compete with other players by predicting crypto price movements!")})},0),e}function Qt(){const e=document.createElement("section");e.id="games",e.style.cssText=`
    padding: var(--spacing-3xl) 0;
    background: transparent;
  `;const t=document.createElement("div");t.className="container";const r=document.createElement("h2");r.textContent="Game Modes",r.style.cssText=`
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    font-size: 2.5rem;
  `,t.appendChild(r);const n=document.createElement("div");n.className="grid",n.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    gap: var(--spacing-md);
    max-width: 1400px;
    padding: 0 var(--spacing-md);
    margin: 0 auto;
    animation: fadeIn 0.8s ease-out;
  `,[re.DREAM_TEAM,re.TIME_BASED,re.PREDICT_CANDLE,re.PVP_MODE,re.CRYPTO_DUEL].forEach((c,o)=>{const s=er(c,o);n.appendChild(s)});const i=rr();return n.appendChild(i),t.appendChild(n),e.appendChild(t),e}function er(e,t){const r=document.createElement("div");return r.className="card game-mode-card",r.style.cssText=`
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
      ${tr(e.name)}
    </button>
  `,r.addEventListener("click",()=>{oe(e.path)}),r}function tr(e){switch(e){case"Dream Team":return"Build Now";case"Crypto Duel":return"Find Duel";case"Predict Candle":return"Predict";case"PvP Battle":return"Compete";default:return"Play Now"}}function rr(e){const t=document.createElement("div");return t.className="card coming-soon-card",t.style.cssText=`
    width: 100%;
    max-width: 350px;
    animation: fadeIn 0.6s ease-out ${Object.keys(re).length*.1}s both;
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

  `,t}function nr(){const e=document.createElement("section");e.id="stats",e.style.cssText=`
    padding: var(--spacing-3xl) 0;
  `;const t=document.createElement("div");t.className="container";const r=document.createElement("h2");r.textContent="Platform Stats",r.style.cssText=`
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    font-size: 2.5rem;
  `,t.appendChild(r);const n=document.createElement("div");return n.className="grid grid-4",n.style.animation="fadeIn 0.8s ease-out",[{label:"Total Players",value:"10,234",icon:"👥"},{label:"Active Games",value:"1,456",icon:"🎮"},{label:"Total Volume",value:"$2.4M",icon:"💰"},{label:"Rewards Paid",value:"$156K",icon:"🏆"}].forEach((i,c)=>{const o=document.createElement("div");o.className="card",o.style.cssText=`
      text-align: center;
      animation: scaleIn 0.6s ease-out ${c*.1}s both;
    `,o.innerHTML=`
      <div style="font-size: 2.5rem; margin-bottom: var(--spacing-sm);">
        ${i.icon}
      </div>
      <div style="font-size: 2rem; font-weight: 700; margin-bottom: var(--spacing-sm); background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        ${i.value}
      </div>
      <div style="color: var(--color-text-secondary); font-size: 0.875rem;">
        ${i.label}
      </div>
    `,n.appendChild(o)}),t.appendChild(n),e.appendChild(t),e}function ar(){const e=document.createElement("div");return e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  `,e.innerHTML=`
    <div class="grid-container" style="
      position: absolute;
      width: 400%;
      height: 400%;
      top: -150%;
      left: -150%;
      background-image: 
        linear-gradient(rgba(9, 194, 133, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(9, 194, 133, 0.12) 1px, transparent 1px);
      background-size: 50px 50px;
      transform: perspective(1000px) rotateX(70deg);
      animation: gridMove 50s linear infinite;
      will-change: transform;
    "></div>
    
    <!-- Subtle fade at edges only -->
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(ellipse 120% 100% at center 100%, transparent 0%, transparent 60%, var(--color-bg-primary) 90%),
        linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 5%, transparent 95%, var(--color-bg-primary) 100%),
        linear-gradient(to right, var(--color-bg-primary) 0%, transparent 5%, transparent 95%, var(--color-bg-primary) 100%);
      pointer-events: none;
    "></div>
    
    <style>
      @keyframes gridMove {
        0% { transform: perspective(1000px) rotateX(70deg) translateY(0); }
        100% { transform: perspective(1000px) rotateX(70deg) translateY(50px); }
      }
    </style>
  `,e}function ir(){const e=document.createElement("div");e.className="social-sticky-bar",e.style.cssText=`
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    z-index: 100;
    padding: 16px 12px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-right: none;
    border-radius: 16px 0 0 16px;
  `;const t=[{name:"X (Twitter)",url:"https://x.com/leaguesdotfun",icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
      </svg>`},{name:"Discord",url:"https://discord.gg/cryptoleagues",icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/>
        <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/>
        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"/>
        <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
      </svg>`},{name:"Telegram",url:"https://t.me/cryptoleagues",icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"/>
      </svg>`},{name:"Docs",url:"https://docs.cryptoleagues.io",icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
        <path d="M9 9l1 0"/>
        <path d="M9 13l6 0"/>
        <path d="M9 17l6 0"/>
      </svg>`}];return e.innerHTML=`
    <style>
      .social-link-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .social-link {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.5);
        background: transparent;
        transition: all 0.3s ease;
        text-decoration: none;
        position: relative;
      }
      .social-link:hover {
        color: #09C285;
        transform: scale(1.15);
      }
      .social-link svg {
        width: 18px;
        height: 18px;
      }
      .social-divider {
        width: 20px;
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 8px 0;
      }
      .social-link::before {
        content: attr(data-tooltip);
        position: absolute;
        right: 44px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 0.7rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .social-link:hover::before {
        opacity: 1;
        visibility: visible;
        right: 48px;
      }
    </style>
    ${t.map((r,n)=>`
      <div class="social-link-item">
        <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="social-link" data-tooltip="${r.name}">
          ${r.icon}
        </a>
        ${n<t.length-1?'<div class="social-divider"></div>':""}
      </div>
    `).join("")}
  `,e}function or(){const e=document.createElement("div");e.className="mouse-glow",e.style.cssText=`
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(9, 194, 133, 0.15) 0%, rgba(9, 194, 133, 0.05) 30%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
    will-change: left, top;
  `;let t=0,r=0,n=0,a=0,i=!1,c=!1,o=!0,s=null;function l(){if(!o||!i){c=!1;return}const p=t-n,g=r-a;if(n+=p*.08,a+=g*.08,e.style.left=n+"px",e.style.top=a+"px",Math.abs(p)<.5&&Math.abs(g)<.5){c=!1;return}s=requestAnimationFrame(l)}function d(){!c&&o&&i&&(c=!0,l())}return document.addEventListener("mousemove",p=>{t=p.clientX,r=p.clientY,i||(i=!0,e.style.opacity="1"),d()}),document.addEventListener("mouseleave",()=>{i=!1,e.style.opacity="0"}),document.addEventListener("mouseenter",()=>{i=!0,e.style.opacity="1",d()}),document.addEventListener("visibilitychange",()=>{o=!document.hidden,o&&i?d():s&&(cancelAnimationFrame(s),c=!1)}),e}const sr=["BTC","ETH","XRP","BNB","SOL","TRX","DOGE","ADA","BCH","LINK","HYPE","XLM","XMR","LTC","SUI","AVAX","HBAR","ZEC","SHIB","CRO","TON","MNT","UNI","DOT","AAVE","TAO","BGB","CC","NEAR","ASTER","ETC","ENA","ICP","PEPE","PUMP","KAS","WLD","QNT","POL","APT","ALGO","TRUMP","ARB","VET","FIL","ATOM","RENDER","SEI","CAKE","BONK","IP","JUP","MORPHO","PENGU","AERO","MYX","DASH","OP","VIRTUAL","INJ","STX","STRK","XTZ","TIA","GRT","ETHFI","FLOKI","2Z","ENS","IOTA","PENDLE","PYTH","BAT","LUNC","MERL","FARTCOIN","WIF","SAND","HNT","S","FLOW","JASMY","XPL","GALA","THETA","GNO","CHZ","SYRUP","COMP","RAY","BORG","MON","MANA","NEO","ZK","ZRO","ZBCN","PIPPIN","AR","1INCH","CHEEMS","EIGEN","WAL","IMX","RUNE","EGLD","ZORA","KMNO","WEMIX","W","JTO","AXS","DYDX","SNX","SFP","MET","KAITO","QTUM","GRASS","KSM","AIOZ","LINEA","RON","CORE","MOVE","AXL","AKT","KAVA","BABYDOGE","MINA","BERA","DGB","EOS","H"];async function he(e=20){try{const r=await fetch(`${ut.COINGECKO_MARKETS}?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h,7d`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return(await r.json()).filter(i=>{const c=i.symbol.toUpperCase();return sr.includes(c)}).slice(0,e).map(i=>({id:i.id,symbol:i.symbol,name:i.name,image:i.image,currentPrice:i.current_price,marketCap:i.market_cap,marketCapRank:i.market_cap_rank,priceChange24h:i.price_change_percentage_24h,priceChange7d:i.price_change_percentage_7d_in_currency,volume24h:i.total_volume,circulatingSupply:i.circulating_supply,totalSupply:i.total_supply,high24h:i.high_24h,low24h:i.low_24h}))}catch(t){throw console.error("Error fetching top tokens:",t),t}}async function lr(e){try{const t=e.join(","),r=await fetch(`${ut.COINGECKO_PRICE}?ids=${t}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return await r.json()}catch(t){throw console.error("Error fetching token prices:",t),t}}function Oe(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0)),r=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59)),n=r.getTime()-e.getTime(),a=Math.floor(n/(1e3*60*60)),i=Math.floor(n%(1e3*60*60)/(1e3*60)),c=Math.floor(n%(1e3*60)/1e3);return{competitionStart:t,competitionEnd:r,timeRemaining:n,timeRemainingFormatted:`${a}h ${i}m ${c}s`,isActive:n>0,startTimestamp:t.getTime(),endTimestamp:r.getTime()}}async function vt(e){try{const t=await he(250),r=e.toLowerCase().trim();return t.filter(a=>{const i=a.name.toLowerCase().includes(r),c=a.symbol.toLowerCase().includes(r);return i||c}).slice(0,20)}catch(t){throw console.error("Error searching tokens:",t),t}}const ft=Object.freeze(Object.defineProperty({__proto__:null,fetchTokenPrices:lr,fetchTopTokens:he,getCompetitionTimeInfo:Oe,searchTokens:vt},Symbol.toStringTag,{value:"Module"}));async function cr(e){console.log("Submitting duel prediction:",e);try{if(!M.getState().connected)throw new Error("Wallet not connected");return await Ve(),{success:!0,predictionId:Math.floor(Math.random()*1e6),txHash:`0x${Math.random().toString(16).substring(2,66)}`,message:"Prediction submitted successfully!"}}catch(t){throw console.error("Error submitting prediction:",t),t}}async function dr(e){const{team:t}=e;console.log("Submitting dream team:",e);try{if(!M.getState().connected)throw new Error("Wallet not connected");if(t.length!==15)throw new Error("Team must have exactly 15 tokens");return await Ve(),{success:!0,teamId:Math.floor(Math.random()*1e6),txHash:`0x${Math.random().toString(16).substring(2,66)}`,message:"Team submitted successfully!"}}catch(r){throw console.error("Error submitting team:",r),r}}async function pr(e){console.log("Submitting candle prediction:",e);try{if(!M.getState().connected)throw new Error("Wallet not connected");return await Ve(),{success:!0,predictionId:Math.floor(Math.random()*1e6),txHash:`0x${Math.random().toString(16).substring(2,66)}`,message:"Prediction submitted successfully!"}}catch(t){throw console.error("Error submitting prediction:",t),t}}async function Ve(){if(await new Promise(e=>setTimeout(e,1e3+Math.random()*1e3)),Math.random()<.1)throw new Error("Transaction failed: Insufficient gas or user rejected")}const K={BTC:{pair:"BTCUSDT",name:"Bitcoin",image:"https://assets.coingecko.com/coins/images/1/small/bitcoin.png"},ETH:{pair:"ETHUSDT",name:"Ethereum",image:"https://assets.coingecko.com/coins/images/279/small/ethereum.png"},XRP:{pair:"XRPUSDT",name:"XRP",image:"https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png"},BNB:{pair:"BNBUSDT",name:"BNB",image:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png"},SOL:{pair:"SOLUSDT",name:"Solana",image:"https://assets.coingecko.com/coins/images/4128/small/solana.png"},TRX:{pair:"TRXUSDT",name:"TRON",image:"https://assets.coingecko.com/coins/images/1094/small/tron-logo.png"},DOGE:{pair:"DOGEUSDT",name:"Dogecoin",image:"https://assets.coingecko.com/coins/images/5/small/dogecoin.png"},ADA:{pair:"ADAUSDT",name:"Cardano",image:"https://assets.coingecko.com/coins/images/975/small/cardano.png"},LINK:{pair:"LINKUSDT",name:"Chainlink",image:"https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png"},AVAX:{pair:"AVAXUSDT",name:"Avalanche",image:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png"},SUI:{pair:"SUIUSDT",name:"Sui",image:"https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg"},XLM:{pair:"XLMUSDT",name:"Stellar",image:"https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png"},LTC:{pair:"LTCUSDT",name:"Litecoin",image:"https://assets.coingecko.com/coins/images/2/small/litecoin.png"},SHIB:{pair:"SHIBUSDT",name:"Shiba Inu",image:"https://assets.coingecko.com/coins/images/11939/small/shiba.png"},DOT:{pair:"DOTUSDT",name:"Polkadot",image:"https://assets.coingecko.com/coins/images/12171/small/polkadot.png"},UNI:{pair:"UNIUSDT",name:"Uniswap",image:"https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png"},AAVE:{pair:"AAVEUSDT",name:"Aave",image:"https://assets.coingecko.com/coins/images/12645/small/AAVE.png"},NEAR:{pair:"NEARUSDT",name:"NEAR",image:"https://assets.coingecko.com/coins/images/10365/small/near.jpg"},ETC:{pair:"ETCUSDT",name:"Ethereum Classic",image:"https://assets.coingecko.com/coins/images/453/small/ethereum-classic-logo.png"},ICP:{pair:"ICPUSDT",name:"Internet Computer",image:"https://assets.coingecko.com/coins/images/14495/small/Internet_Computer_logo.png"},PEPE:{pair:"PEPEUSDT",name:"Pepe",image:"https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg"},APT:{pair:"APTUSDT",name:"Aptos",image:"https://assets.coingecko.com/coins/images/26455/small/aptos_round.png"},ALGO:{pair:"ALGOUSDT",name:"Algorand",image:"https://assets.coingecko.com/coins/images/4380/small/download.png"},ARB:{pair:"ARBUSDT",name:"Arbitrum",image:"https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg"},VET:{pair:"VETUSDT",name:"VeChain",image:"https://assets.coingecko.com/coins/images/1167/small/VET_Token_Icon.png"},FIL:{pair:"FILUSDT",name:"Filecoin",image:"https://assets.coingecko.com/coins/images/12817/small/filecoin.png"},ATOM:{pair:"ATOMUSDT",name:"Cosmos",image:"https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png"},SEI:{pair:"SEIUSDT",name:"Sei",image:"https://assets.coingecko.com/coins/images/28205/small/Sei_Logo_-_Transparent.png"},CAKE:{pair:"CAKEUSDT",name:"PancakeSwap",image:"https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo.png"},BONK:{pair:"BONKUSDT",name:"Bonk",image:"https://assets.coingecko.com/coins/images/28600/small/bonk.jpg"},OP:{pair:"OPUSDT",name:"Optimism",image:"https://assets.coingecko.com/coins/images/25244/small/Optimism.png"},INJ:{pair:"INJUSDT",name:"Injective",image:"https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png"},STX:{pair:"STXUSDT",name:"Stacks",image:"https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png"},XTZ:{pair:"XTZUSDT",name:"Tezos",image:"https://assets.coingecko.com/coins/images/976/small/Tezos-logo.png"},TIA:{pair:"TIAUSDT",name:"Celestia",image:"https://assets.coingecko.com/coins/images/31967/small/tia.jpg"},GRT:{pair:"GRTUSDT",name:"The Graph",image:"https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png"},ENS:{pair:"ENSUSDT",name:"Ethereum Name Service",image:"https://assets.coingecko.com/coins/images/19785/small/acatxTm8_400x400.jpg"},IOTA:{pair:"IOTAUSDT",name:"IOTA",image:"https://assets.coingecko.com/coins/images/692/small/IOTA_Swirl.png"},PENDLE:{pair:"PENDLEUSDT",name:"Pendle",image:"https://assets.coingecko.com/coins/images/15069/small/Pendle_Logo_Normal-03.png"},PYTH:{pair:"PYTHUSDT",name:"Pyth Network",image:"https://assets.coingecko.com/coins/images/31924/small/pyth.png"},BAT:{pair:"BATUSDT",name:"Basic Attention Token",image:"https://assets.coingecko.com/coins/images/677/small/basic-attention-token.png"},WIF:{pair:"WIFUSDT",name:"dogwifhat",image:"https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg"},SAND:{pair:"SANDUSDT",name:"The Sandbox",image:"https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg"},FLOW:{pair:"FLOWUSDT",name:"Flow",image:"https://assets.coingecko.com/coins/images/13446/small/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png"},JASMY:{pair:"JASMYUSDT",name:"JasmyCoin",image:"https://assets.coingecko.com/coins/images/13876/small/JASMY200x200.jpg"},GALA:{pair:"GALAUSDT",name:"Gala",image:"https://assets.coingecko.com/coins/images/12493/small/GALA-COINGECKO.png"},THETA:{pair:"THETAUSDT",name:"Theta Network",image:"https://assets.coingecko.com/coins/images/2538/small/theta-token-logo.png"},CHZ:{pair:"CHZUSDT",name:"Chiliz",image:"https://assets.coingecko.com/coins/images/8834/small/CHZ_Token_updated.png"},COMP:{pair:"COMPUSDT",name:"Compound",image:"https://assets.coingecko.com/coins/images/10775/small/COMP.png"},MANA:{pair:"MANAUSDT",name:"Decentraland",image:"https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png"},NEO:{pair:"NEOUSDT",name:"Neo",image:"https://assets.coingecko.com/coins/images/480/small/NEO_512_512.png"},ZK:{pair:"ZKUSDT",name:"zkSync",image:"https://assets.coingecko.com/coins/images/38043/small/ZKTokenBlack.png"},ZRO:{pair:"ZROUSDT",name:"LayerZero",image:"https://assets.coingecko.com/coins/images/28206/small/ftxG9_TJ_400x400.jpeg"},AR:{pair:"ARUSDT",name:"Arweave",image:"https://assets.coingecko.com/coins/images/4343/small/oRt6SiEN_400x400.jpg"},"1INCH":{pair:"1INCHUSDT",name:"1inch",image:"https://assets.coingecko.com/coins/images/13469/small/1inch-token.png"},IMX:{pair:"IMXUSDT",name:"Immutable",image:"https://assets.coingecko.com/coins/images/17233/small/immutableX-symbol-BLK-RGB.png"},RUNE:{pair:"RUNEUSDT",name:"THORChain",image:"https://assets.coingecko.com/coins/images/6595/small/Rune200x200.png"},EGLD:{pair:"EGLDUSDT",name:"MultiversX",image:"https://assets.coingecko.com/coins/images/12335/small/egld-token-logo.png"},AXS:{pair:"AXSUSDT",name:"Axie Infinity",image:"https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png"},DYDX:{pair:"DYDXUSDT",name:"dYdX",image:"https://assets.coingecko.com/coins/images/17500/small/hjnIm9bV.jpg"},SNX:{pair:"SNXUSDT",name:"Synthetix",image:"https://assets.coingecko.com/coins/images/3406/small/SNX.png"},QTUM:{pair:"QTUMUSDT",name:"Qtum",image:"https://assets.coingecko.com/coins/images/684/small/Qtum_Logo_blue_CG.png"},KSM:{pair:"KSMUSDT",name:"Kusama",image:"https://assets.coingecko.com/coins/images/9568/small/m4zRhP5e_400x400.jpg"},RON:{pair:"RONUSDT",name:"Ronin",image:"https://assets.coingecko.com/coins/images/20009/small/ronin.jpg"},AXL:{pair:"AXLUSDT",name:"Axelar",image:"https://assets.coingecko.com/coins/images/27277/small/V-65_xQ1_400x400.jpeg"},KAVA:{pair:"KAVAUSDT",name:"Kava",image:"https://assets.coingecko.com/coins/images/9761/small/kava.png"},MINA:{pair:"MINAUSDT",name:"Mina Protocol",image:"https://assets.coingecko.com/coins/images/15628/small/JM4_vQ34_400x400.png"},EOS:{pair:"EOSUSDT",name:"EOS",image:"https://assets.coingecko.com/coins/images/738/small/eos-eos-logo.png"},FLOKI:{pair:"FLOKIUSDT",name:"FLOKI",image:"https://assets.coingecko.com/coins/images/16746/small/PNG_image.png"},WLD:{pair:"WLDUSDT",name:"Worldcoin",image:"https://assets.coingecko.com/coins/images/31069/small/worldcoin.jpeg"},STRK:{pair:"STRKUSDT",name:"Starknet",image:"https://assets.coingecko.com/coins/images/26433/small/starknet.png"},RENDER:{pair:"RENDERUSDT",name:"Render",image:"https://assets.coingecko.com/coins/images/11636/small/rndr.png"},JTO:{pair:"JTOUSDT",name:"Jito",image:"https://assets.coingecko.com/coins/images/33228/small/jto.png"},JUP:{pair:"JUPUSDT",name:"Jupiter",image:"https://assets.coingecko.com/coins/images/34188/small/jup.png"},BERA:{pair:"BERAUSDT",name:"Berachain",image:"https://assets.coingecko.com/coins/images/36017/small/bera.png"},MOVE:{pair:"MOVEUSDT",name:"Movement",image:"https://assets.coingecko.com/coins/images/37160/small/move.jpg"},POL:{pair:"POLUSDT",name:"Polygon",image:"https://assets.coingecko.com/coins/images/4713/small/polygon.png"}};let D=new Map;async function Ue(e,t="1m",r=50){const n=K[e];if(!n)throw new Error(`Token ${e} not supported on Binance`);const a=`https://api.binance.com/api/v3/klines?symbol=${n.pair}&interval=${t}&limit=${r}`;try{const i=await fetch(a);if(!i.ok)throw new Error(`Binance API error: ${i.status}`);return(await i.json()).map(o=>({openTime:o[0],open:parseFloat(o[1]),high:parseFloat(o[2]),low:parseFloat(o[3]),close:parseFloat(o[4]),volume:parseFloat(o[5]),closeTime:o[6],isGreen:parseFloat(o[4])>=parseFloat(o[1]),isClosed:!0}))}catch(i){throw console.error(`Error fetching candles for ${e}:`,i),i}}function Te(e,t,r){const n=K[e];if(!n)return console.error(`Token ${e} not supported on Binance`),()=>{};const a=`${n.pair.toLowerCase()}@kline_${t}`,i=`${e}_${t}`;if(D.has(i))return D.get(i).callbacks.add(r),()=>{if(D.has(i)){const u=D.get(i);u.callbacks.delete(r),u.callbacks.size===0&&(u.close(),D.delete(i))}};const c=new Set([r]),o=`wss://stream.binance.com:9443/ws/${a}`;let s,l=!0,d,p=0;const g=()=>{l=!1,d&&clearTimeout(d),s&&(s.onclose=null,s.close())};function m(){l&&(s=new WebSocket(o),s.onopen=()=>{console.log(`WebSocket connected: ${e} ${t}`),p=0},s.onmessage=y=>{try{const v=JSON.parse(y.data).k,h={openTime:v.t,open:parseFloat(v.o),high:parseFloat(v.h),low:parseFloat(v.l),close:parseFloat(v.c),volume:parseFloat(v.v),closeTime:v.T,isGreen:parseFloat(v.c)>=parseFloat(v.o),isClosed:v.x,symbol:e,interval:t};c.forEach(x=>{try{x(h)}catch(T){console.error("Error in candle callback:",T)}})}catch(u){console.error("Error parsing candle data:",u)}},s.onerror=y=>{},s.onclose=()=>{if(l){p++;const y=Math.min(1e3*Math.pow(1.5,p),3e4);console.log(`WebSocket closed for ${e} ${t}, reconnecting in ${y}ms...`),d=setTimeout(m,y)}})}return m(),D.set(i,{callbacks:c,close:g}),()=>{if(D.has(i)){const y=D.get(i);y.callbacks.delete(r),y.callbacks.size===0&&(y.close(),D.delete(i))}}}function bt(e){const t=K[e];return t?{id:e.toLowerCase(),symbol:e,name:t.name,image:t.image,pair:t.pair}:null}function xt(e=12){return["BTC","ETH","SOL","XRP","DOGE","PEPE","BNB","ADA","AVAX","LINK","DOT","SHIB"].slice(0,e).map(n=>bt(n)).filter(Boolean)}function Be(e,t){const r=K[e];if(!r)return console.error(`Token ${e} not supported on Binance`),()=>{};const n=`${r.pair.toLowerCase()}@ticker`,a=`ticker_${e}`;if(D.has(a))return D.get(a).callbacks.add(t),()=>{if(D.has(a)){const y=D.get(a);y.callbacks.delete(t),y.callbacks.size===0&&(y.close(),D.delete(a))}};const i=new Set([t]),c=`wss://stream.binance.com:9443/ws/${n}`;let o,s=!0,l,d=0;const p=()=>{s=!1,l&&clearTimeout(l),o&&(o.onclose=null,o.close())};function g(){s&&(o=new WebSocket(c),o.onopen=()=>{console.log(`Ticker WebSocket connected: ${e}`),d=0},o.onmessage=m=>{try{const y=JSON.parse(m.data),u={symbol:e,price:parseFloat(y.c),priceChange24h:parseFloat(y.P),high24h:parseFloat(y.h),low24h:parseFloat(y.l),volume24h:parseFloat(y.v),lastUpdate:Date.now()};i.forEach(v=>{try{v(u)}catch(h){console.error("Error in ticker callback:",h)}})}catch(y){console.error("Error parsing ticker data:",y)}},o.onerror=m=>{},o.onclose=()=>{if(s){d++;const m=Math.min(1e3*Math.pow(1.5,d),3e4);console.log(`Ticker WebSocket closed for ${e}, reconnecting in ${m}ms...`),l=setTimeout(g,m)}})}return g(),D.set(a,{callbacks:i,close:p}),()=>{if(D.has(a)){const m=D.get(a);m.callbacks.delete(t),m.callbacks.size===0&&(m.close(),D.delete(a))}}}async function Ye(e){const t=K[e];if(!t)throw new Error(`Token ${e} not supported on Binance`);const r=`https://api.binance.com/api/v3/ticker/24hr?symbol=${t.pair}`;try{const n=await fetch(r);if(!n.ok)throw new Error(`Binance API error: ${n.status}`);const a=await n.json();return{symbol:e,name:t.name,image:t.image,price:parseFloat(a.lastPrice),priceChange24h:parseFloat(a.priceChangePercent),high24h:parseFloat(a.highPrice),low24h:parseFloat(a.lowPrice),volume24h:parseFloat(a.volume)}}catch(n){throw console.error(`Error fetching ticker for ${e}:`,n),n}}async function Q(e){try{const t=await fetch("https://api.binance.com/api/v3/ticker/24hr");if(!t.ok)throw new Error(`Binance API error: ${t.status}`);const r=await t.json(),n=new Map;return r.forEach(i=>{n.set(i.symbol,i)}),e.filter(i=>K[i]).map(i=>{const c=K[i],o=n.get(c.pair);return o?{symbol:i,name:c.name,image:c.image,price:parseFloat(o.lastPrice),priceChange24h:parseFloat(o.priceChangePercent),high24h:parseFloat(o.highPrice),low24h:parseFloat(o.lowPrice),volume24h:parseFloat(o.volume)}:null}).filter(Boolean)}catch(t){return console.error("Error fetching multiple tickers:",t),[]}}const Xe=Object.freeze(Object.defineProperty({__proto__:null,BINANCE_TOKENS:K,fetchHistoricalCandles:Ue,fetchMultipleTickers:Q,fetchTickerData:Ye,getAvailableTokens:xt,getTokenDisplayData:bt,subscribeToCandleUpdates:Te,subscribeToTickerUpdates:Be},Symbol.toStringTag,{value:"Module"}));let Ie=[];function gr(){f={a:null,b:null};const e=document.createElement("div");e.className="crypto-duel-page",e.style.cssText=`
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
  `,t.appendChild(r);const n=document.createElement("div");n.id="token-grid",n.className="grid grid-auto",n.style.marginBottom="var(--spacing-xl)",t.appendChild(n);const a=document.createElement("div");return a.id="selection-panel",a.style.cssText=`
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
  `,e.appendChild(t),e.appendChild(a),mr(n,a),e}let f={a:null,b:null},ie=1;async function mr(e,t){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>',Ie.forEach(r=>r()),Ie=[];try{const n=await Q(["BTC","ETH","SOL","XRP","DOGE","PEPE","BNB","ADA","AVAX","LINK","DOT","SHIB","LTC","UNI","NEAR","ATOM","ARB","OP","SUI","APT"]);if(n.length>0){const a=n.map(i=>({id:i.symbol.toLowerCase(),symbol:i.symbol,name:i.name,image:i.image,currentPrice:i.price,priceChange24h:i.priceChange24h}));rt(a,e,t),n.forEach(i=>{const c=Be(i.symbol,o=>{ur(e,o.symbol.toLowerCase(),o.price,o.priceChange24h)});Ie.push(c)}),console.log("🟢 Loaded tokens from Binance with real-time updates")}else throw new Error("No Binance tokens loaded")}catch(r){console.log("Falling back to CoinGecko:",r.message);try{const n=await he(20);rt(n,e,t)}catch{e.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
          Failed to load tokens. Please try again later.
        </div>
      `}}}function ur(e,t,r,n){const a=e.querySelector(`.token-card[data-token-id="${t}"]`);if(!a)return;const i=a.querySelector(".token-price-value"),c=a.querySelector(".token-price-change");if(i){const o=i.dataset.price||0;i.textContent=B(r),i.dataset.price=r,parseFloat(o)!==r&&(i.style.transition="color 0.3s",i.style.color=r>parseFloat(o)?"#09C285":"#FF4D4F",setTimeout(()=>{i.style.color=""},500))}c&&(c.textContent=Z(n),c.className=`token-price-change ${J(n)}`)}function yr(){const e="duel-tracker-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
    `,document.head.appendChild(t)}function rt(e,t,r){t.innerHTML="",e.forEach(n=>{const a=hr(n);a.addEventListener("click",()=>vr(n,t,r)),t.appendChild(a)})}function hr(e){const t=document.createElement("div");t.className="token-card",t.dataset.tokenId=e.id;const r=J(e.priceChange24h);return t.innerHTML=`
    <div class="token-icon">
      <img src="${e.image}" alt="${e.name}" />
    </div>
    <div class="token-info">
      <div class="token-name">${e.name}</div>
      <div class="token-symbol">${e.symbol.toUpperCase()}</div>
    </div>
    <div class="token-price">
      <div class="token-price-value">${B(e.currentPrice)}</div>
      <div class="token-price-change ${r}">
        ${Z(e.priceChange24h)}
      </div>
    </div>
  `,t}function vr(e,t,r){var n,a;if(((n=f.a)==null?void 0:n.id)===e.id){f.a=null,ce(t),de(r);return}if(((a=f.b)==null?void 0:a.id)===e.id){f.b=null,ce(t),de(r);return}f.a?(f.b&&(f.a=f.b),f.b=e):f.a=e,ce(t),de(r)}function ce(e){e.querySelectorAll(".token-card").forEach(r=>{var a,i;const n=r.dataset.tokenId;n===((a=f.a)==null?void 0:a.id)||n===((i=f.b)==null?void 0:i.id)?r.classList.add("selected"):r.classList.remove("selected")})}function de(e){const t=(f.a?1:0)+(f.b?1:0),r=document.getElementById("duel-main-content"),n=document.getElementById("token-grid"),a=document.querySelectorAll("#token-grid .token-card");if(t===0){e.style.display="none",r&&(r.style.marginRight="0"),n&&n.classList.remove("compact-grid"),a.forEach(s=>s.classList.remove("compact-mode"));return}r&&(r.style.marginRight="320px"),n&&n.classList.add("compact-grid"),a.forEach(s=>s.classList.add("compact-mode")),e.style.cssText=`
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
            ${f.a?f.a.symbol.toUpperCase():"???"} vs ${f.b?f.b.symbol.toUpperCase():"???"}
          </div>
          <button class="remove-selection-btn" style="background: none; border: none; cursor: pointer; padding: 2px; color: var(--color-text-muted); font-size: 1rem;">×</button>
        </div>
        
        <!-- Tokens Display -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
          ${Se(f.a,"A")}
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent-orange); padding: 0 var(--spacing-xs);">VS</div>
          ${Se(f.b,"B")}
        </div>

        <!-- Live Performance Comparison -->
        <!-- 24h Performance Comparison (Simplified) -->
        ${f.a&&f.b?`
        <div style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
             ${(()=>{const s=f.a.priceChange24h||0,l=f.b.priceChange24h||0,d=Math.abs(s-l).toFixed(2);return s>l?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;"><b>${f.a.symbol.toUpperCase()}</b> currently leads <b>${f.b.symbol.toUpperCase()}</b> by <b style="color: #09C285">${d}%</b></span>`:l>s?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;"><b>${f.b.symbol.toUpperCase()}</b> currently leads <b>${f.a.symbol.toUpperCase()}</b> by <b style="color: #09C285">${d}%</b></span>`:'<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance in last 24H</span>'})()}
        </div>
        `:""}

        <!-- Time Period Selection -->
        <div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Duration</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
            ${Object.entries(Y).map(([s,l])=>`
              <button class="time-option ${l.hours===ie?"selected":""}" data-hours="${l.hours}" style="padding: 0.4rem 0.5rem; font-size: 0.8rem;">
                ${l.label}
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
      ${(()=>{const s=Object.keys(Y).find(l=>Math.abs(Y[l].hours-ie)<.001);return s?Y[s].label:"1H"})()}
    </div>
  </div>
  <button class="btn btn-primary" style="width: 100%; padding: 0.875rem;" id="start-duel-btn" ${t<2?"disabled":""}>
    ${t<2?"Select 2 Tokens":"Start Duel"}
  </button>
</div>
  `,e.querySelectorAll(".time-option").forEach(s=>{s.addEventListener("click",()=>{ie=parseFloat(s.dataset.hours),de(e)})});const i=e.querySelector("#close-panel-btn");i&&i.addEventListener("click",()=>{f={a:null,b:null};const s=document.getElementById("token-grid"),l=document.getElementById("duel-main-content"),d=document.querySelectorAll("#token-grid .token-card");s&&(ce(s),s.classList.remove("compact-grid")),l&&(l.style.marginRight="0"),d.forEach(p=>p.classList.remove("compact-mode")),e.style.display="none"});const c=e.querySelector(".remove-selection-btn");c&&c.addEventListener("click",()=>{f={a:null,b:null};const s=document.getElementById("token-grid");s&&ce(s),de(e)});const o=e.querySelector("#start-duel-btn");o&&(o.onclick=()=>{o.disabled||fr()})}function Se(e,t,r=null){if(!e)return`
      <div style="display: flex; align-items: center; gap: var(--spacing-xs); flex: 1;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: var(--color-text-muted);">?</div>
        <div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">Token ${t}</div>
          <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted);">Select</div>
        </div>
      </div>
    `;const n=B(e.currentPrice);let a="0.75rem";return n.length>10?a="0.6rem":n.length>8?a="0.65rem":n.length>6&&(a="0.7rem"),`
    <div style="display: flex; align-items: center; gap: var(--spacing-xs); flex: 1; min-width: 0; overflow: hidden;">
      <img src="${e.image}" alt="${e.symbol}" style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;" />
      <div style="min-width: 0; overflow: hidden;">
        <div style="font-size: 0.7rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${e.name.length>8?e.symbol.toUpperCase():e.name}</div>
        <div ${r?`id="${r}"`:""} style="font-size: ${a}; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${n}</div>
      </div>
    </div>
  `}function fr(){if(!M.getState().connected){alert("Please connect your wallet first!");return}const t=document.createElement("div");t.className="modal-overlay";const r=document.createElement("div");r.className="modal",r.style.maxWidth="500px",r.innerHTML=`
    <button class="modal-close">×</button>
    <h2 class="modal-title">Make Your Prediction</h2>
    
    <div class="modal-body">
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
        Which token will perform better in the next ${(()=>{const n=Object.keys(Y).find(a=>Math.abs(Y[a].hours-ie)<.001);return n?Y[n].label.toLowerCase():"1h"})()}?
      </p>

      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        <button class="btn btn-success btn-lg" id="predict-a">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          ${f.a.name} will outperform ${f.b.name}
        </button>
        
        <button class="btn btn-success btn-lg" id="predict-b">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          ${f.b.name} will outperform ${f.a.name}
        </button>
      </div>
    </div>
  `,t.appendChild(r),document.body.appendChild(t),r.querySelector(".modal-close").addEventListener("click",()=>t.remove()),t.addEventListener("click",n=>{n.target===t&&t.remove()}),r.querySelector("#predict-a").addEventListener("click",()=>nt("A",t)),r.querySelector("#predict-b").addEventListener("click",()=>nt("B",t))}let He=[];async function nt(e,t){var n,a;const r=t.querySelector(e==="A"?"#predict-a":"#predict-b");r.disabled=!0,r.innerHTML='<div class="loading"></div> Fetching prices...';try{let i,c;try{const{fetchTickerData:v}=await ue(async()=>{const{fetchTickerData:T}=await Promise.resolve().then(()=>Xe);return{fetchTickerData:T}},void 0),[h,x]=await Promise.all([v(f.a.symbol.toUpperCase()),v(f.b.symbol.toUpperCase())]);i=h.price,c=x.price,console.log("🟢 Got starting prices from Binance")}catch{console.log("Falling back to CoinGecko for starting prices");const{fetchTokenPrices:h}=await ue(async()=>{const{fetchTokenPrices:T}=await Promise.resolve().then(()=>ft);return{fetchTokenPrices:T}},void 0),x=await h([f.a.id,f.b.id]);i=((n=x[f.a.id])==null?void 0:n.usd)||f.a.currentPrice,c=((a=x[f.b.id])==null?void 0:a.usd)||f.b.currentPrice}console.log(`[Duel Start] ${f.a.symbol}: $${i}`),console.log(`[Duel Start] ${f.b.symbol}: $${c}`),r.innerHTML='<div class="loading"></div> Submitting...';const o=e,s=ie,l=s*60*60*1e3,d=await cr({tokenA:f.a.id,tokenB:f.b.id,predictedWinner:e,duration:ie});t.remove();const p=document.getElementById("selection-panel"),g=document.getElementById("duel-main-content"),m=document.getElementById("token-grid"),y=document.querySelectorAll("#token-grid .token-card");p&&(p.style.display="none"),g&&(g.style.marginRight="0"),m&&m.classList.remove("compact-grid"),y.forEach(v=>{v.classList.remove("compact-mode","selected")});const u={id:d.predictionId,tokenA:{...f.a,startPrice:i},tokenB:{...f.b,startPrice:c},predictedWinner:o,duration:s,startTime:Date.now()};He.push(u),br(u,l),f={a:null,b:null}}catch(i){r.disabled=!1,r.innerHTML=e==="A"?`${f.a.name} will win`:`${f.b.name} will win`,alert(`❌ Error: ${i.message}`)}}async function br(e,t){let r=!0,n=e.tokenA.startPrice,a=e.tokenB.startPrice,i=null,c=null;const o=document.createElement("div");o.id=`duel-countdown-${e.id}`;const s=()=>{o.className="",o.style.cssText="margin-top: auto; border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md);"},l=()=>{yr(),o.className="duel-tracker-card pulse",o.style.cssText=""},d=w=>w>=1e3?"$"+w.toLocaleString("en-US",{maximumFractionDigits:2}):w>=1?"$"+w.toFixed(2):"$"+w.toFixed(6),p=(w,k)=>(w-k)/k*100,g=async()=>{try{const{subscribeToTickerUpdates:w}=await ue(async()=>{const{subscribeToTickerUpdates:k}=await Promise.resolve().then(()=>Xe);return{subscribeToTickerUpdates:k}},void 0);i=w(e.tokenA.symbol.toUpperCase(),k=>{n=k.price}),c=w(e.tokenB.symbol.toUpperCase(),k=>{a=k.price}),console.log("🔴 Started live price tracking for duel")}catch(w){console.log("Could not start ticker updates:",w)}},m=()=>{i&&i(),c&&c(),console.log("⬛ Stopped live price tracking for duel")},y=w=>{const k=Math.ceil(w/1e3),C=Math.floor(k/60),z=k%60,G=C>0?`${C}:${z.toString().padStart(2,"0")}`:`${k}s`,b=p(n,e.tokenA.startPrice),E=p(a,e.tokenB.startPrice),$=b>=E?e.tokenA.symbol:e.tokenB.symbol;o.innerHTML=`
      <div class="loading" style="width: 14px; height: 14px; border-color: white; border-top-color: transparent;"></div>
      <span style="color: white; font-weight: 600; font-size: 0.85rem;">${$} 🏆</span>
      <span style="color: rgba(255,255,255,0.8); font-weight: 700; font-size: 0.9rem;">${G}</span>
    `},u=w=>{const k=Math.ceil(w/1e3),C=Math.floor(k/60),z=k%60,G=C>0?`${C}m ${z}s`:`${k}s`,b=p(n,e.tokenA.startPrice),E=p(a,e.tokenB.startPrice),$=b>E,H=E>b,F=Math.abs(b-E)<.001,L=document.getElementById("live-price-a");L&&(L.textContent=d(n));const N=document.getElementById("live-price-b");N&&(N.textContent=d(a));const P=document.getElementById("live-perf-summary");if(P){const U=Math.abs(b-E).toFixed(3);$?P.innerHTML=`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenA.symbol.toUpperCase()}</b> is leading <b>${e.tokenB.symbol.toUpperCase()}</b> by <b style="color: #09C285">${U}%</b></span>`:H?P.innerHTML=`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenB.symbol.toUpperCase()}</b> is leading <b>${e.tokenA.symbol.toUpperCase()}</b> by <b style="color: #09C285">${U}%</b></span>`:P.innerHTML='<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance since start</span>'}o.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-sm);">
        <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
          <div class="loading" style="width: 12px; height: 12px;"></div>
          <span style="font-weight: 600; font-size: 0.85rem; color: var(--color-primary);">LIVE DUEL</span>
        </div>
        <span style="font-weight: 700; font-size: 0.9rem; color: var(--color-text-primary);">${G}</span>
      </div>
      
      <!-- Live Status -->
      <div style="background: rgba(9, 194, 133, 0.1); border: 1px solid rgba(9, 194, 133, 0.3); border-radius: var(--radius-md); padding: var(--spacing-sm); text-align: center;">
         <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 2px;">
            ${F?"⚖️ Currently Tied":$?`🏆 ${e.tokenA.symbol} LEADING`:`🏆 ${e.tokenB.symbol} LEADING`}
         </div>
         <div style="font-size: 0.75rem; color: var(--color-text-muted);">
            ${F?"Both tokens have equal performance":`Leading by ${Math.abs(b-E).toFixed(3)}%`}
         </div>
         <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.75rem;">
            <span style="color: ${b>=0?"#09C285":"#FF4D4F"}">${e.tokenA.symbol}: ${b>=0?"+":""}${b.toFixed(3)}%</span>
            <span style="color: ${E>=0?"#09C285":"#FF4D4F"}">${e.tokenB.symbol}: ${E>=0?"+":""}${E.toFixed(3)}%</span>
         </div>
      </div>
      
      <button class="btn" style="width: 100%; margin-top: var(--spacing-md); background: var(--color-bg-tertiary); color: var(--color-text-muted); opacity: 0.7; cursor: not-allowed;">
        Duel in Progress...
      </button>
    `},v=()=>{var w;return`
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
            ${Se(e.tokenA,"A","live-price-a")}
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent-orange); padding: 0 var(--spacing-xs);">VS</div>
            ${Se(e.tokenB,"B","live-price-b")}
          </div>

          <!-- 24h Performance Comparison (Simplified Static Context) -->
          <div id="live-perf-summary" style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
             ${(()=>{const k=e.tokenA.priceChange24h||0,C=e.tokenB.priceChange24h||0,z=Math.abs(k-C).toFixed(2);return k>C?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenA.symbol.toUpperCase()}</b> is leading <b>${e.tokenB.symbol.toUpperCase()}</b> by <b style="color: #09C285">${z}%</b></span>`:C>k?`<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${e.tokenB.symbol.toUpperCase()}</b> is leading <b>${e.tokenA.symbol.toUpperCase()}</b> by <b style="color: #09C285">${z}%</b></span>`:'<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance in last 24H</span>'})()}
          </div>

          <!-- Time Period Selection -->
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Duration</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
               <div style="padding: 0.4rem 0.5rem; font-size: 0.8rem; background: var(--gradient-green); border-radius: var(--radius-md); text-align: center; font-weight: 600; border: 1px solid transparent;">
                  ${((w=Object.values(Y).find(k=>Math.abs(k.hours-e.duration)<.001))==null?void 0:w.label)||"1H"}
               </div>
            </div>
          </div>
        </div>
      </div>
    `},h=()=>{const k=window.location.hash.replace("#","").replace("/","")==="crypto-duel",C=document.getElementById("selection-panel");if(k&&C){if(!r||o.parentElement!==C){r=!0,o.parentElement===document.body&&document.body.removeChild(o),C.style.display="flex";const z=document.getElementById("duel-main-content");z&&(z.style.marginRight="320px"),C.innerHTML=v(),s(),C.appendChild(o),u(x)}}else if(r||o.parentElement!==document.body){if(r=!1,o.parentElement){o.parentElement.removeChild(o);const z=document.getElementById("selection-panel");z&&(z.style.display="none")}l(),document.body.appendChild(o),y(x)}};o.addEventListener("click",()=>{r||(window.location.hash="#/crypto-duel")}),window.addEventListener("hashchange",h),window.addEventListener("navigate",h),g();let x=t;h();const T=setInterval(()=>{x-=1e3,x<=0?(clearInterval(T),m(),window.removeEventListener("hashchange",h),window.removeEventListener("navigate",h),o.parentElement!==document.body&&(o.parentElement&&o.parentElement.removeChild(o),o.style.cssText=`
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
        `,document.body.appendChild(o)),xr(e,o)):r?u(x):y(x)},1e3)}async function xr(e,t){var r,n;t.innerHTML=`
    <div style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm);">
      <div class="loading" style="width: 20px; height: 20px;"></div>
      <span>Calculating results...</span>
    </div>
  `;try{let a,i;try{const{fetchTickerData:d}=await ue(async()=>{const{fetchTickerData:m}=await Promise.resolve().then(()=>Xe);return{fetchTickerData:m}},void 0),[p,g]=await Promise.all([d(e.tokenA.symbol.toUpperCase()),d(e.tokenB.symbol.toUpperCase())]);a=p.price,i=g.price,console.log("🟢 Got final prices from Binance")}catch{console.log("Falling back to CoinGecko for final prices");const{fetchTokenPrices:p}=await ue(async()=>{const{fetchTokenPrices:m}=await Promise.resolve().then(()=>ft);return{fetchTokenPrices:m}},void 0),g=await p([e.tokenA.id,e.tokenB.id]);a=((r=g[e.tokenA.id])==null?void 0:r.usd)||e.tokenA.startPrice,i=((n=g[e.tokenB.id])==null?void 0:n.usd)||e.tokenB.startPrice}const c=(a-e.tokenA.startPrice)/e.tokenA.startPrice*100,o=(i-e.tokenB.startPrice)/e.tokenB.startPrice*100;let s;Math.abs(c-o)<.001?s="TIE":s=c>o?"A":"B";const l=s==="TIE"?null:e.predictedWinner===s;wr(e,t,{changeA:c,changeB:o,actualWinner:s,userWon:l,endPriceA:a,endPriceB:i}),He=He.filter(d=>d.id!==e.id)}catch(a){console.error("Error determining winner:",a),t.innerHTML=`
      <div style="color: var(--color-danger); text-align: center; padding: var(--spacing-md);">
        ❌ Error fetching results
        <button onclick="this.parentElement.parentElement.remove()" style="display: block; margin: var(--spacing-sm) auto 0; padding: 0.5rem 1rem; cursor: pointer;">Dismiss</button>
      </div>
    `}}function wr(e,t,r){const n=r.actualWinner==="A"?e.tokenA:e.tokenB;r.actualWinner==="A"?e.tokenB:e.tokenA;const a=document.getElementById("selection-panel");a&&a.contains(t)?(t.style.cssText=`
      width: 100%;
      max-width: 300px;
      margin: 0 auto var(--spacing-md) auto;
      padding: 0;
      align-self: center;
    `,a.style.paddingBottom="0",a.style.justifyContent="flex-start"):t.style.cssText=`
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
        ${r.actualWinner==="TIE"?'<span style="font-size: 0.85rem; color: var(--color-text-muted);">Both tokens performed equally!</span>':`<span style="font-size: 0.85rem;">${n.symbol.toUpperCase()} outperformed by <strong style="color: var(--color-success);">${Math.abs(r.changeA-r.changeB).toFixed(3)}%</strong></span>`}
      </div>
      <button id="close-duel-result-btn" class="btn ${r.userWon?"btn-success":"btn-primary"}" style="width: 100%;">
        ${r.userWon?"🏆 Claim Reward":"Claim Reward"}
      </button>
    </div>
  `;const c=t.querySelector("#close-duel-result-btn");c&&c.addEventListener("click",o=>{o.stopPropagation(),t.remove();const s=document.getElementById("selection-panel");if(s){s.style.display="none";const l=document.getElementById("duel-main-content");l&&(l.style.marginRight="0");const d=document.getElementById("token-grid"),p=document.querySelectorAll("#token-grid .token-card");d&&d.classList.remove("compact-grid"),p.forEach(g=>g.classList.remove("compact-mode"))}})}const wt=document.createElement("style");wt.textContent=`
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
`;document.head.appendChild(wt);let kt=[],Ce=[];function ve(){return[...kt]}function kr(e){kt=[...e],Cr()}function Er(e){return Ce.push(e),()=>{const t=Ce.indexOf(e);t!==-1&&Ce.splice(t,1)}}function Cr(){Ce.forEach(e=>e(ve()))}let Re=!1;function at(e){Re=e}function Tr(){const e=Re;return Re=!1,e}function Sr(){const e=document.createElement("div");e.className="dream-team-page",e.id="dream-team-page";const t=document.createElement("div");t.className="container",t.id="dream-team-container",t.style.cssText=`
    padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-xl);
    transition: all 0.3s ease;
  `;const r=document.createElement("div");r.style.cssText=`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  `;const n=document.createElement("div");n.className="card",n.style.cssText="position: relative; padding: var(--spacing-lg);";const a=Oe();n.innerHTML=`
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
        <span id="competition-timer">${a.timeRemainingFormatted}</span> remaining
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
  `,setInterval(()=>{const w=n.querySelector("#competition-timer");if(w){const k=Oe();w.textContent=k.timeRemainingFormatted}},1e3);const i=n.querySelector("#join-competition-btn");i&&(i.onclick=w=>{w.preventDefault();const k=document.getElementById("dream-team-controls");k&&k.scrollIntoView({behavior:"smooth",block:"start"})});const c=document.createElement("div");c.className="card",c.style.cssText="position: relative; padding: var(--spacing-md);",c.innerHTML=`
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
  `,r.appendChild(n),r.appendChild(c),r.appendChild(o),t.appendChild(r);const s=document.createElement("div");s.style.cssText=`
    text-align: center;
    margin-bottom: var(--spacing-md);
  `,s.innerHTML=`
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
  `,t.appendChild(s);const l=document.createElement("div");l.id="dream-team-controls",l.style.cssText=`
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
  `;const p=document.createElement("div");p.style.cssText=`
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-shrink: 0;
  `;const g=document.createElement("div");g.style.cssText="transition: all 0.3s ease;",g.innerHTML=`
    <input type="text" class="input" placeholder="Search tokens..." id="search-input" style="width: 180px; border-radius: 12px; padding: 0.5rem 1rem; font-size: 0.85rem; border: 1px solid var(--color-border); background: var(--color-bg-secondary);" />
  `;const m=document.createElement("div");m.id="selected-badge",m.className="badge badge-primary",m.style.cssText=`
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 600;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    display: none;
    white-space: nowrap;
  `,m.innerHTML='<span id="selected-count">0</span>/15',p.appendChild(g),p.appendChild(m),l.appendChild(d),l.appendChild(p),t.appendChild(l);const y=document.createElement("div");y.id="token-grid-wrapper";const u=document.createElement("div");u.id="token-grid",u.className="grid grid-auto",y.appendChild(u),t.appendChild(y);const v=document.createElement("div");v.id="action-bar",v.style.cssText=`
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
  `,v.innerHTML=`
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
  `,e.appendChild(v),e.appendChild(t),ye(u);const h=d.querySelectorAll(".category-btn");h.forEach(w=>{w.addEventListener("click",()=>{h.forEach(C=>{C.style.background="var(--color-bg-secondary)",C.style.color="var(--color-text-primary)",C.classList.remove("active")}),w.style.background="var(--color-primary)",w.style.color="white",w.classList.add("active");const k=w.dataset.category;Ct(k,u)})});const x=g.querySelector("#search-input");let T;return x.addEventListener("input",w=>{clearTimeout(T),T=setTimeout(()=>{w.target.value.trim()?Et(w.target.value,u):ye(u)},300)}),e}let S=ve();function it(){kr(S)}async function ye(e){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const t=await he(250);Ke(t,e),S=ve(),Ae(),Tr()&&S.length===15&&setTimeout(()=>St(),500)}catch{e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `}}async function Et(e,t){t.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=await vt(e);r.length===0?t.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);">
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-danger); margin-bottom: var(--spacing-sm);">
            YOU CANNOT CHOOSE THIS TOKEN IN THE DREAM TEAM
          </div>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
            Try searching for a different cryptocurrency from our available list.
          </div>
        </div>
      `:Ke(r,t)}catch{t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Search failed. Please try again.
      </div>
    `}}async function Ct(e,t){if(e==="all"){ye(t);return}t.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=await he(250),a={defi:["AAVE","UNI","CAKE","MORPHO","PENDLE","COMP","SNX","DYDX","RUNE","SUSHI","CRV"],layer2:["ARB","OP","STRK","ZK","ZRO","LINEA","MERL","ZORA","MANTA"],gaming:["AXS","GALA","SAND","IMX","MANA","WEMIX","RON","BEAM","PRIME"],meme:["DOGE","SHIB","PEPE","BONK","FLOKI","WIF","FARTCOIN","CHEEMS","BABYDOGE"]}[e]||[],i=r.filter(c=>a.includes(c.symbol.toUpperCase()));i.length===0?t.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-text-secondary);">
          No tokens found in this category
        </div>
      `:Ke(i,t)}catch{t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again.
      </div>
    `}}function Ke(e,t){t.innerHTML="",e.forEach(r=>{const n=Mr(r);t.appendChild(n)})}function Mr(e){const t=document.createElement("div");t.className="card token-card",t.dataset.tokenId=e.id,t.style.cssText=`
    cursor: pointer;
    transition: all var(--transition-base);
    animation: fadeIn 0.6s ease-out;
  `;const r=J(e.priceChange24h),n=S.findIndex(l=>l.id===e.id),a=n>-1,i=a?S[n].direction:null;a&&(i==="UP"?t.classList.add("selected-up"):i==="DOWN"?t.classList.add("selected-down"):t.classList.add("selected"));const c=e.name.length<=8;t.innerHTML=`
    <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
      <img src="${e.image}" alt="${e.name}" class="lifted-element" style="width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;" />
      <div style="width: 55px; flex-shrink: 0;">
        <div class="lifted-element" style="font-weight: 700; font-size: 1rem; ${c?"margin-bottom: 2px;":""}">${e.symbol.toUpperCase()}</div>
        ${c?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${e.name}</div>`:""}
      </div>
      <!-- ✅ FIXED-WIDTH RIGHT COLUMN -->
      <div style="width: 90px; text-align: right; flex-shrink: 0;">
        <div class="token-current-price" style="font-size: 0.95rem; font-weight: 700; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${B(e.currentPrice)}
        </div>
        <div class="token-price-change ${r}" style="font-size: 0.8rem; white-space: nowrap;">
          ${Z(e.priceChange24h)}
        </div>
      </div>

    </div>
    <!-- Split Selection Overlay -->
    <div class="selection-overlay">
      <div class="selection-overlay-left" onclick="event.stopPropagation();"></div>
      <div class="selection-overlay-right" onclick="event.stopPropagation();"></div>
    </div>
  `;const o=t.querySelector(".selection-overlay-left"),s=t.querySelector(".selection-overlay-right");return o&&o.addEventListener("click",l=>{l.stopPropagation(),Ne(e,t,"DOWN")}),s&&s.addEventListener("click",l=>{l.stopPropagation(),Ne(e,t,"UP")}),t.addEventListener("click",l=>{a&&!l.target.closest(".selection-overlay")&&Ne(e,t,null)}),t}function $r(){const e=["#09C285","#4a90e2","#FFD700","#FF6B6B","#4ECDC4","#95E1D3"];for(let r=0;r<50;r++){const n=document.createElement("div");n.style.cssText=`
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
    `,document.body.appendChild(n),setTimeout(()=>{n.remove()},4e3)}}const Tt=document.createElement("style");Tt.textContent=`
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
`;document.head.appendChild(Tt);function Ne(e,t,r){const n=S.findIndex(a=>a.id===e.id);if(n>-1)if(r===null)S.splice(n,1),t.classList.remove("selected","selected-up","selected-down");else if(S[n].direction===r)S.splice(n,1),t.classList.remove("selected","selected-up","selected-down");else{S[n].direction=r,t.classList.remove("selected-up","selected-down"),t.classList.add(r==="UP"?"selected-up":"selected-down");const a=t.querySelector(".badge");a&&(a.className=`badge ${r==="UP"?"badge-success":"badge-danger"}`,a.textContent=r==="UP"?"UP":"Down")}else{if(S.length>=15){alert("You can only select up to 15 tokens!");return}const a=r||"UP";S.push({...e,direction:a}),t.classList.add(a==="UP"?"selected-up":"selected-down")}Ae()}function Ae(){const e=document.getElementById("dream-team-page"),t=document.getElementById("dream-team-container"),r=document.getElementById("token-grid-wrapper"),n=document.getElementById("token-grid"),a=document.querySelector(".dream-team-page .container > div:first-child"),i=t==null?void 0:t.querySelector('div[style*="text-align: center"]'),c=i==null?void 0:i.nextElementSibling;if(S.length>0&&e&&t&&r){if(e.style.cssText=`
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
    `,i){i.style.cssText=`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0;
        gap: var(--spacing-md);
      `;const y=i.querySelector('div[style*="justify-content: center"]'),u=i.querySelector("p");if(y){y.style.justifyContent="flex-start",y.style.marginBottom="0";const v=y.querySelector("h1");v&&(v.style.fontSize="1.5rem");const h=y.querySelector("svg");h&&(h.setAttribute("width","28"),h.setAttribute("height","28"))}if(u&&(u.style.display="none"),c){c.style.display="none";const v=c.querySelector("div:first-child"),h=c.querySelector("div:last-child");if(v&&!i.querySelector(".category-btn")){const x=v.cloneNode(!0);x.id="compact-categories",i.appendChild(x),x.querySelectorAll(".category-btn").forEach(T=>{T.addEventListener("click",()=>{x.querySelectorAll(".category-btn").forEach(C=>{C.style.background="var(--color-bg-secondary)",C.style.color="var(--color-text-primary)"}),T.style.background="var(--color-primary)",T.style.color="white";const w=T.dataset.category,k=document.getElementById("token-grid");k&&Ct(w,k)})})}if(h&&!i.querySelector("#search-input")){const x=h.cloneNode(!0);x.id="compact-right",i.appendChild(x);const T=x.querySelector("#search-input");if(T){T.id="search-input";let w;T.addEventListener("input",k=>{clearTimeout(w),w=setTimeout(()=>{const C=document.getElementById("token-grid");k.target.value.trim()&&C?Et(k.target.value,C):C&&ye(C)},300)})}}}}const m=document.createElement("style");m.id="token-grid-scrollbar",document.getElementById("token-grid-scrollbar")||(m.textContent=`
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
      `,document.head.appendChild(m)),a&&(a.style.display="none"),n&&(n.style.gridTemplateColumns="repeat(5, 1fr)",n.style.gap="var(--spacing-sm)")}else if(e&&t&&r){if(e.style.cssText="",t.style.cssText=`
      padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-xl);
      transition: all 0.3s ease;
    `,r.style.cssText="display: block;",i){i.style.cssText=`
        text-align: center;
        margin-bottom: var(--spacing-md);
      `;const m=i.querySelector('div[style*="flex-start"], div[style*="justify-content"]'),y=i.querySelector("p");if(m){m.style.justifyContent="center",m.style.marginBottom="var(--spacing-xs)";const h=m.querySelector("h1");h&&(h.style.fontSize="2rem");const x=m.querySelector("svg");x&&(x.setAttribute("width","36"),x.setAttribute("height","36"))}y&&(y.style.display="block");const u=i.querySelector("#compact-categories"),v=i.querySelector("#compact-right");u&&u.remove(),v&&v.remove()}c&&(c.style.display="flex"),a&&(a.style.display="grid"),n&&(n.style.gridTemplateColumns="",n.style.gap="")}const o=document.getElementById("selected-count");o&&(o.textContent=S.length);const s=document.getElementById("selected-badge"),l=document.getElementById("search-input");let d=document.getElementById("unselect-all-btn");if(!d){d=document.createElement("button"),d.id="unselect-all-btn",d.innerHTML=`
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
    `,d.onmouseover=()=>{d.style.background="rgba(255, 77, 79, 0.2)"},d.onmouseout=()=>{d.style.background="rgba(255, 77, 79, 0.15)"};const m=document.getElementById("selected-badge");m&&m.parentNode&&m.parentNode.insertBefore(d,m)}d.onclick=()=>{S=[],it(),document.querySelectorAll(".token-card").forEach(y=>{y.classList.remove("selected","selected-up","selected-down");const u=y.querySelector(".badge");u&&u.remove()});const m=document.getElementById("token-grid");m&&ye(m),Ae()},s&&(S.length>0?(s.style.display="block",d&&(d.style.display="flex"),setTimeout(()=>{s.style.opacity="1",s.style.transform="translateX(0)"},10),s.style.fontSize="0.8rem",s.style.padding="0.5rem 1rem",s.style.borderRadius="12px",s.style.fontWeight="600",s.style.lineHeight="1.5",s.style.height="36px",s.style.boxSizing="border-box",s.style.display="inline-flex",s.style.alignItems="center",l&&(l.placeholder="Search tokens...",l.style.width="180px"),S.length===15?(s.className="badge badge-success",s.style.background="var(--color-primary)",s.style.color="white",s.style.border="none"):(s.className="badge badge-primary",s.style.background="",s.style.color="",s.style.border="")):(s.style.opacity="0",s.style.transform="translateX(20px)",d&&(d.style.display="none"),l&&(l.placeholder="Search...",l.style.width="160px"),setTimeout(()=>{s.style.display="none"},300)));const p=document.getElementById("action-bar");p&&(S.length===15?(p.style.display="flex",p.dataset.confettiShown||($r(),p.dataset.confettiShown="true")):(p.style.display="none",p.dataset.confettiShown=""));const g=document.getElementById("bottom-submit-btn");g&&(g.style.cssText="padding: 0.895rem 2.5rem; font-size: 1.125rem; background: var(--color-primary); color: white; border: none;",g.onclick=()=>St()),it()}function St(){const e=document.createElement("div");e.className="modal-overlay",e.style.animation="fadeIn 0.2s ease-out",e.style.backdropFilter="blur(4px)",e.style.webkitBackdropFilter="blur(4px)";const t=document.createElement("div");t.className="modal",t.style.maxWidth="600px",t.style.boxShadow="0 20px 60px rgba(0, 0, 0, 0.3)";function r(){t.innerHTML=`
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
                  Team Roster (${S.length-(a!==-1?1:0)-(i!==-1?1:0)} Remaining)
             </div>
             <div id="roster-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xs);"></div>
          </div>
          
        </div>
      `;const o=t.querySelector("#captain-slot");if(a!==-1){const p=S[a],g=n(p,a,"CAPTAIN");o.appendChild(g)}else o.innerHTML=`
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
          `;const s=t.querySelector("#vice-slot");if(i!==-1){const p=S[i],g=n(p,i,"VICE");s.appendChild(g)}else s.innerHTML=`
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
          `;const l=t.querySelector("#roster-grid"),d=S.filter((p,g)=>g!==a&&g!==i);d.forEach((p,g)=>{const m=S.indexOf(p),y=n(p,m,"ROSTER");d.length%2===1&&g===d.length-1&&(y.style.gridColumn="span 2",y.style.maxWidth="50%",y.style.margin="0 auto"),l.appendChild(y)}),t.querySelector(".modal-close").addEventListener("click",()=>e.remove()),c()}function n(o,s,l){const d=document.createElement("div"),p=l!=="ROSTER";let g="1px solid var(--glass-border)",m="var(--glass-bg)";l==="CAPTAIN"?(m="rgba(0, 123, 255, 0.15)",g="1px solid #007bff"):l==="VICE"&&(m="rgba(255, 215, 0, 0.15)",g="1px solid #FFD700"),d.className="card",d.style.cssText=`
        padding: ${p?"var(--spacing-sm)":"6px"};
        display: flex;
        align-items: center;
        gap: ${p?"var(--spacing-sm)":"8px"};
        background: ${m};
        border: ${g};
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;
        min-height: ${p?"auto":"50px"};
      `;const y=o.direction==="UP"?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12 12 5 19 12"></polyline></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="19 12 12 19 5 12"></polyline></svg>';if(d.innerHTML=`
        <div style="position: relative;">
            <img src="${o.image}" alt="${o.name}" style="width: ${p?"40px":"28px"}; height: ${p?"40px":"28px"}; border-radius: 50%;" />
            <!-- Direction Arrow Indicator -->
            <div style="position: absolute; bottom: -4px; right: -4px; background: white; border-radius: 50%; padding: 2px; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                ${y}
            </div>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 600; font-size: ${p?"1rem":"0.8rem"}; line-height: 1.2; color: #000;">${o.symbol.toUpperCase()}</div>
        </div>
        
        ${l==="ROSTER"?`
            <div style="display: flex; gap: 6px;">
                <button class="btn-swap" style="background: var(--color-primary); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                    C
                </button>
                <button class="btn-vice" style="background: #FFD700; color: #000; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                    VC
                </button>
            </div>
        `:""}
      `,l==="ROSTER"){const u=d.querySelector(".btn-swap");u&&(u.onclick=h=>{h.stopPropagation(),a=s,s===i&&(i=-1),r()});const v=d.querySelector(".btn-vice");v&&(v.onclick=h=>{h.stopPropagation(),i=s,r()})}return d}let a=-1,i=-1;r();async function c(){const o=t.querySelector(".modal-body"),s=o.querySelector(".submit-team-btn");s&&s.remove();const l=document.createElement("button");l.className="btn btn-primary submit-team-btn",l.style.width="fit-content",l.style.display="block",l.style.margin="var(--spacing-md) auto",l.style.padding="0.875rem 5rem",l.style.cssText+="background: #09C285 !important; color: white !important; border: none !important; opacity: 1;",l.textContent="Submit Team",o.appendChild(l),l.addEventListener("click",async()=>{if(a===-1||i===-1){alert("Please select captain and vice captain first");return}l.disabled=!0,l.innerHTML='<div class="loading"></div>';try{const d=await dr({team:S.map(p=>({id:p.id,direction:p.direction})),captainIndex:a,viceCaptainIndex:i});e.remove(),alert(`✅ ${d.message}

Team ID: ${d.teamId}
Transaction: ${d.txHash.slice(0,10)}...`),S=[],Ae()}catch(d){l.disabled=!1,l.textContent="Submit Team",alert(`❌ Error: ${d.message}`)}})}t.querySelector(".modal-close").addEventListener("click",()=>e.remove()),e.addEventListener("click",o=>{o.target===e&&e.remove()}),e.appendChild(t),document.body.appendChild(e)}const te=new Map;function Lr(){const e=document.createElement("div");e.className="time-based-page",e.style.height="calc(100vh - 64px)",e.style.overflowY="auto";const t=document.createElement("div");t.className="container",t.style.padding="var(--spacing-xl) var(--spacing-lg)";const r=document.createElement("div");r.style.marginBottom="var(--spacing-xl)";const n=`
    <defs>
      <linearGradient id="time-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3B82F6"/>
        <stop offset="100%" style="stop-color:#2563EB"/>
      </linearGradient>
    </defs>
  `;r.innerHTML=`
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${n}
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
  `,t.appendChild(r);const a=document.createElement("div");return a.id="token-grid",a.className="grid",a.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  `,t.appendChild(a),e.appendChild(t),Pr(a),window.addEventListener("hashchange",()=>{te.forEach(i=>{i.timerInterval&&clearInterval(i.timerInterval)}),te.clear()},{once:!0}),e}async function Pr(e){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=await Q(["BTC","ETH","SOL","XRP","DOGE","PEPE","BNB","ADA","AVAX","LINK","DOT","SHIB","LTC","UNI","NEAR","ATOM","ARB","OP","SUI","APT"]);if(r&&r.length>0){const n=r.map(a=>({...a,currentPrice:a.price}));Br(n,e)}else throw new Error("No Binance tokens found")}catch(t){console.error("Error loading tokens:",t),e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens from Binance. Please try again later.
      </div>
    `}}function Br(e,t){t.innerHTML="",e.forEach(r=>{const n=Ar(r);t.appendChild(n)})}function Ar(e){const t=document.createElement("div");t.className="card prediction-card",t.dataset.symbol=e.symbol,t.style.cssText=`
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.6s ease-out;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    position: relative;
    overflow: hidden;
  `;const r=J(e.priceChange24h),n=B(e.currentPrice);t.innerHTML=`
    <!-- Header -->
    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
      <img src="${e.image}" alt="${e.name}" style="width: 48px; height: 48px; border-radius: 50%;" />
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 2px;">${e.name}</div>
        <div style="font-size: 0.875rem; color: var(--color-text-muted);">${e.symbol.toUpperCase()}</div>
      </div>
      <div style="text-align: right;">
        <div class="token-price" style="font-size: 1.1rem; font-weight: 700;">${n}</div>
        <div class="token-change ${r}" style="font-size: 0.875rem;">${Z(e.priceChange24h)}</div>
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
  `,Be(e.symbol,c=>{zr(t,c)});const a=t.querySelector(".up-btn"),i=t.querySelector(".down-btn");return a.addEventListener("click",()=>ot(e,"UP",t)),i.addEventListener("click",()=>ot(e,"DOWN",t)),t}function zr(e,t){const r=e.querySelector(".token-price"),n=e.querySelector(".token-change");if(r&&n){const i=parseFloat(r.dataset.rawPrice||0);r.textContent=B(t.price),r.dataset.rawPrice=t.price,i&&i!==t.price&&(r.style.color=t.price>i?"#09C285":"#FF4D4F",setTimeout(()=>{r.style.color=""},300)),n.textContent=Z(t.priceChange24h),n.className=`token-change ${J(t.priceChange24h)}`}const a=e.querySelector(".active-state");if(a.style.display!=="none"){const i=a.querySelector(".current-price");if(i){i.textContent=B(t.price);const c=e.dataset.symbol,o=te.get(c);if(o){const s=o.startPrice,l=o.type,d=l==="UP"&&t.price>s||l==="DOWN"&&t.price<s;i.style.color=d?"#09C285":"#FF4D4F"}}}}async function ot(e,t,r){if(!M.getState().connected){alert("Please connect your wallet first!");return}if(te.has(e.symbol))return;const a=r.querySelector(".prediction-area"),i=r.querySelector(".active-state");i.querySelector(".prediction-text"),i.querySelector(".start-price"),i.querySelector(".current-price"),i.querySelector(".timer-display"),r.querySelector(".result-state"),a.style.display="none",i.style.display="flex",i.innerHTML='<div class="loading"></div> Preparing...';try{let c=e.currentPrice;try{c=(await Ye(e.symbol)).price}catch{console.log("Using cached price for start")}i.innerHTML=`
      <div style="font-size: 0.9rem; margin-bottom: var(--spacing-sm); color: var(--color-text-muted);">
        Predicted: <span class="prediction-text" style="font-weight: 700; color: ${t==="UP"?"#09C285":"#FF4D4F"}">${t}</span>
      </div>
      <div class="timer-display" style="font-size: 2.5rem; font-weight: 700; font-variant-numeric: tabular-nums; margin-bottom: var(--spacing-sm);">
        01:00
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.85rem; padding: 0 var(--spacing-md);">
        <div>Start: <span class="start-price">${B(c)}</span></div>
        <div>Current: <span class="current-price">${B(c)}</span></div>
      </div>
    `;const o=60,s=Date.now(),l=s+o*1e3,d={type:t,startPrice:c,startTime:s,timerInterval:null};te.set(e.symbol,d);const p=()=>{const g=Date.now(),m=l-g,u=(window.location.hash.replace("#","")||"/")==="/time-based";if(m<=0){clearInterval(d.timerInterval),Dr(e,r,d);const h=document.getElementById(`frenzy-tracker-${e.symbol}`);h&&h.remove();return}const v=Math.ceil(m/1e3);if(u){const h=i.querySelector(".timer-display");h&&(h.textContent=`00:${v.toString().padStart(2,"0")}`,v<=10?h.style.color="#FF4D4F":h.style.color="");const x=document.getElementById(`frenzy-tracker-${e.symbol}`);x&&(x.style.display="none")}else{const h=Ir(e.symbol,t,l);h.style.display="flex",Nr(h,e.symbol,t,m)}};d.timerInterval=setInterval(p,1e3),p(),window.addEventListener("hashchange",p)}catch(c){console.error(c),alert("Failed to start prediction"),a.style.display="flex",i.style.display="none"}}async function Dr(e,t,r){const n=t.querySelector(".active-state"),a=t.querySelector(".result-state");n.style.display="none",a.style.display="flex",a.innerHTML='<div class="loading"></div> Calculating...';try{let i=r.startPrice;try{i=(await Ye(e.symbol)).price}catch(p){console.error("Error fetching final price",p)}const c=i>r.startPrice,o=i<r.startPrice,s=i===r.startPrice;let l=!1;r.type==="UP"&&c&&(l=!0),r.type==="DOWN"&&o&&(l=!0),a.innerHTML=`
      <div style="font-size: 3rem; margin-bottom: var(--spacing-sm); animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
        ${l?"🎉":"😔"}
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-xs); color: ${l?"var(--color-success)":"var(--color-danger)"};">
        ${l?"You Won!":"You Lost"}
      </div>
      <div style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
        Price went ${c?"UP":o?"DOWN":"NOWHERE"} (${B(r.startPrice)} → ${B(i)})
      </div>
      <button class="reset-btn" style="
        background: ${l?"var(--color-primary)":"var(--color-bg-secondary)"};
        color: ${l?"white":"var(--color-text-primary)"};
        border: 1px solid ${l?"transparent":"var(--glass-border)"};
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      ">
        ${l?"Claim Reward":"Close"}
      </button>
    `;const d=a.querySelector(".reset-btn");d.onclick=()=>{te.delete(e.symbol),a.style.display="none",t.querySelector(".prediction-area").style.display="flex"}}catch(i){console.error(i),a.innerHTML=`
      <div style="color: var(--color-danger);">Error calculating results.</div>
      <button class="reset-btn">Close</button>
    `,a.querySelector(".reset-btn").onclick=()=>{te.delete(e.symbol),a.style.display="none",t.querySelector(".prediction-area").style.display="flex"}}}function Fr(){const e="frenzy-tracker-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
    `,document.head.appendChild(t)}function Ir(e,t,r){const n=`frenzy-tracker-${e}`;let a=document.getElementById(n);return a||(Fr(),a=document.createElement("div"),a.id=n,a.className="frenzy-tracker-card pulse",a.addEventListener("click",()=>{window.location.hash="#/time-based"}),document.body.appendChild(a)),a}function Nr(e,t,r,n){const a=Math.floor(n%36e5/6e4),i=Math.floor(n%6e4/1e3),c=a>0?`${a}:${i.toString().padStart(2,"0")}`:`00:${i.toString().padStart(2,"0")}`,o=r==="UP"?"#09C285":"#FF4D4F",s=r==="UP"?"↑":"↓";e.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 500;">1min Frenzy</div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 0.95rem;">${t}</span>
                <span style="color: ${o}; font-weight: 700; font-size: 0.9rem;">${s} ${r}</span>
            </div>
        </div>
        <div style="font-family: monospace; font-size: 1.25rem; font-weight: 700; color: ${i<=10?"#FF4D4F":"white"};">
            ${c}
        </div>
    `}let Me=[];const X=new Map,q=new Map,$e={1:"1m",3:"3m",5:"5m",15:"15m",30:"30m",60:"1h"};function Or(){const e=document.createElement("div");e.className="predict-candle-page";const t=document.createElement("div");t.className="container",t.style.padding="var(--spacing-md) var(--spacing-lg)";const r=document.createElement("div");r.style.cssText="margin-bottom: var(--spacing-lg); text-align: center;",r.innerHTML=`
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
  `,t.appendChild(r);const n=document.createElement("div");n.style.cssText=`
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
  `,n.innerHTML=`
    <button class="timeframe-btn" data-minutes="1">1 Min</button>
    <button class="timeframe-btn" data-minutes="3">3 Min</button>
    <button class="timeframe-btn selected" data-minutes="5">5 Min</button>
    <button class="timeframe-btn" data-minutes="15">15 Min</button>
    <button class="timeframe-btn" data-minutes="30">30 Min</button>
    <button class="timeframe-btn" data-minutes="60">1 Hour</button>
  `,t.appendChild(n);const a=document.createElement("div");a.id="candle-token-grid",a.className="grid",a.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  `,t.appendChild(a),e.appendChild(t);let i=5;return n.querySelectorAll(".timeframe-btn").forEach(c=>{c.addEventListener("click",()=>{n.querySelectorAll(".timeframe-btn").forEach(o=>o.classList.remove("selected")),c.classList.add("selected"),i=parseInt(c.dataset.minutes),st(a,i)})}),st(a,i),window.addEventListener("hashchange",()=>{Mt()}),e}function Mt(){Me.forEach(e=>{typeof e=="function"&&e()}),Me=[],X.clear()}async function st(e,t){Mt(),e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';try{const r=xt(12),n=$e[t]||"5m";e.innerHTML="";for(const a of r){const i=await Ur(a,n,t);e.appendChild(i)}}catch(r){console.error("Error loading tokens:",r),e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `}}async function Ur(e,t,r){const n=document.createElement("div");n.className="card candle-card",n.id=`candle-card-${e.symbol}`,n.style.cssText=`
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.6s ease-out;
    min-height: 300px;
  `;let a=[],i=0,c=0;try{if(a=await Ue(e.symbol,t,15),X.set(e.symbol,[...a]),a.length>0){i=a[a.length-1].close;const b=a[0].open;c=(i-b)/b*100}}catch(b){console.error(`Error fetching candles for ${e.symbol}:`,b)}let o=50,s=50;if(a.length>0){const b=a.filter($=>$.isGreen).length,E=a.length;o=Math.round(b/E*100),s=100-o,o=Math.max(10,Math.min(90,o)),s=Math.max(10,Math.min(90,s))}function l(){const b=[];q.forEach((E,$)=>{const{prediction:H,wagerAmount:F,targetCandleOpenTime:L,entryPriceRef:N,symbol:P,timeframe:U,key:ee,customStatus:j}=E;b.push({key:ee||$,prediction:H,wagerAmount:F,targetCandleOpenTime:L,entryPriceRef:N,symbol:P,timeframe:U,customStatus:j})}),localStorage.setItem("predict_candle_bets",JSON.stringify(b))}function d(){const b=localStorage.getItem("predict_candle_bets");if(b)try{JSON.parse(b).forEach($=>{const{key:H,symbol:F,timeframe:L,targetCandleOpenTime:N}=$,P=L*60*1e3,U=N+P;Date.now()>=U?p($):g($)})}catch(E){console.error("Failed to restore bets:",E)}}async function p(b){const{symbol:E,timeframe:$,targetCandleOpenTime:H,key:F}=b,L=$e[$]||"5m";try{const P=(await Ue(E,L,50)).find(ee=>ee.openTime===H),U={...b,button:null,unsub:null,timerInterval:null};q.set(F,U),P&&P.isClosed?je(F,E,P,U):Date.now()-(H+$*6e4)>36e5?(q.delete(F),l()):g(b)}catch(N){console.error("Error checking past bet:",N)}}function g(b){const{symbol:E,timeframe:$,targetCandleOpenTime:H,key:F}=b,L=$e[$],N=$*60*1e3,P={...b,button:null,timerInterval:null},U=()=>{const j=Date.now(),W=H,Qe=W+N,Ot=(window.location.hash.replace("#","")||"/")==="/predict-candle";if(j>=Qe){clearInterval(P.timerInterval);return}const ze=j<W,De=Math.max(0,(ze?W:Qe)-j);if(Ot){if(!P.button||!document.body.contains(P.button)){const xe=document.getElementById(`candle-card-${E}`);if(xe){const se=xe.querySelector(".submit-prediction-btn");se&&(P.button=se,se.disabled=!0)}}const V=P.button;if(V&&document.body.contains(V)){const xe=Math.floor(De%36e5/6e4),se=Math.floor(De%6e4/1e3),et=xe+":"+se.toString().padStart(2,"0"),we=X.get(E),Ut=we&&we.length>0?B(we[we.length-1].close):"";ze?(V.innerHTML=`<span style="opacity:0.8;">Starts in</span> ${et}`,V.style.background="#3B82F6"):(V.innerHTML=`
                      <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>Live: ${et}</span>
                        <span style="opacity: 0.6;">|</span>
                        <span>${Ut}</span>
                      </div>
                    `,V.style.background=b.prediction==="green"?"#09C285":"#FF4D4F")}const be=document.getElementById(`tracker-item-${E}`);be&&be.remove()}else{const V=Lt(),be=ze?"Starting in...":"Your candle prediction is Live";Pt(V,E,b.prediction,De,be)}};P.timerInterval=setInterval(U,1e3);const ee=Te(E,L,j=>{const W=X.get(E)||[];(j.isClosed||!W.length||j.close!==W[W.length-1].close)&&X.set(E,[...W,j]),j.isClosed&&je(F,E,j,P)});P.unsub=ee,window.addEventListener("hashchange",U),q.set(F,P),U()}d(),n.innerHTML=`
    <!-- Token Header -->
    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
      <img src="${e.image}" alt="${e.name}" style="width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.1); padding: 4px;" onerror="this.src='https://via.placeholder.com/52'" />
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem;">${e.symbol}</div>
      </div>
      <div style="text-align: right;">
        <div class="live-price" style="font-size: 1.1rem; font-weight: 700;">${B(i)}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
          <div class="candle-pulse-dot" style="width: 6px; height: 6px; background: ${a.length>0&&a[a.length-1].isGreen?"#09C285":"#FF4D4F"}; border-radius: 50%; animation: pulse 2s infinite;"></div>
          <span class="current-candle-status" style="font-size: 0.7rem; font-weight: 600; color: ${a.length>0&&a[a.length-1].isGreen?"#09C285":"#FF4D4F"};">
            ${a.length>0&&a[a.length-1].isGreen?"GREEN":"RED"}
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
        ${$t(a)}
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
        <span style="color: #FF4D4F;">Red</span> <span style="opacity: 0.6;">${s}%</span>
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
          <span class="balance-display" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 0.65rem; color: var(--color-text-muted); opacity: 0.7; white-space: nowrap;">${M.getState().connected?"/ $0.00":""}</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="quick-amount-btn" data-amount="5" style="
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
          ">+5</button>
          <button class="quick-amount-btn" data-amount="10" style="
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
          ">+10</button>
          <button class="quick-amount-btn" data-amount="max" style="
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
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
  `;let m=null;const y=Te(e.symbol,t,b=>{Hr(n,b,e.symbol)});Me.push(y);const u=n.querySelector(".green-option"),v=n.querySelector(".red-option"),h=n.querySelector(".submit-prediction-btn"),x=n.querySelector(".wager-input");function T(){m&&parseFloat(x.value)>0?(h.disabled=!1,h.style.opacity="1",h.textContent=m==="green"?"Buy Green":"Buy Red",h.style.background=m==="green"?"#09C285":"#FF4D4F"):m?(h.disabled=!0,h.style.opacity="0.7",h.textContent="Enter amount",h.style.background="#3B82F6"):(h.disabled=!0,h.style.opacity="0.5",h.textContent="Select Green or Red",h.style.background="#3B82F6")}u.addEventListener("click",()=>{m="green",u.style.background="#09C285",u.style.border="none",u.style.color="white",u.querySelector("svg").setAttribute("stroke","white"),u.querySelector("span").style.color="white",v.style.background="rgba(255, 255, 255, 0.08)",v.style.border="1px solid rgba(255, 77, 79, 0.4)",v.style.color="var(--color-text-primary)",v.querySelector("svg").setAttribute("stroke","#FF4D4F"),v.querySelector("span").style.color="#FF4D4F",T()}),v.addEventListener("click",()=>{m="red",v.style.background="#FF4D4F",v.style.border="none",v.style.color="white",v.querySelector("svg").setAttribute("stroke","white"),v.querySelector("span").style.color="white",u.style.background="rgba(255, 255, 255, 0.08)",u.style.border="1px solid rgba(9, 194, 133, 0.4)",u.style.color="var(--color-text-primary)",u.querySelector("svg").setAttribute("stroke","#09C285"),u.querySelector("span").style.color="#09C285",T()}),x.addEventListener("input",T);const w=n.querySelector(".balance-display");let k=0;const C=async b=>{b.connected?(k=0,w.textContent=`/ $${k.toFixed(2)}`):(k=0,w.textContent="")};C(M.getState());const z=M.subscribe(C);Me.push(z),n.querySelectorAll(".quick-amount-btn").forEach(b=>{b.addEventListener("click",()=>{const E=b.dataset.amount;if(E==="max"){if(!M.getState().connected){alert("Please connect your wallet first!");return}x.value=k||0}else{const $=parseFloat(x.value)||0;x.value=$+parseInt(E)}T()})}),h.addEventListener("click",()=>{if(m&&parseFloat(x.value)>0){const b=parseFloat(x.value);Rr(e.symbol,m,e.name,r,b,h)}});const G=`${e.symbol}-${r}`;if(q.has(G)){const b=q.get(G);b.button=h,h.disabled=!0,u.style.opacity="0.5",v.style.opacity="0.5",u.style.pointerEvents="none",v.style.pointerEvents="none",x.disabled=!0,b.timerInterval?h.innerHTML="Restoring...":b.customStatus==="won"?(h.innerHTML="🎉 Claim Reward",h.style.background="linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",h.style.color="#000",h.disabled=!1,h.onclick=()=>Bt(e.symbol,b,h,G)):b.customStatus==="lost"&&(h.innerHTML="❌ Lost",h.style.background="#666")}return n}function $t(e){if(!e||e.length===0)return'<div style="color: var(--color-text-muted); font-size: 0.875rem; width: 100%; text-align: center; display: flex; align-items: center; justify-content: center;">Loading candles...</div>';const t=e.flatMap(o=>[o.high,o.low]),r=Math.min(...t),a=Math.max(...t)-r||1,i=110,c=Math.max(4,Math.floor(120/e.length));return e.map((o,s)=>{const d=o.isGreen?"#09C285":"#FF4D4F",p=i-(o.high-r)/a*i,g=i-(o.low-r)/a*i,m=i-(o.open-r)/a*i,y=i-(o.close-r)/a*i,u=Math.min(p,Math.min(m,y)),h=g-u,x=Math.min(m,y),T=Math.max(2,Math.abs(y-m)),w=s===e.length-1,k=.5+s/e.length*.5;return`
      <div class="candle" data-index="${s}" style="
        position: relative;
        width: ${c}px;
        height: 100%;
        ${w?"animation: candlePulse 1s infinite;":""}
      ">
        <!-- Wick -->
        <div style="
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: ${u}px;
          width: 1px;
          height: ${h}px;
          background: ${d};
          opacity: ${k};
        "></div>
        <!-- Body -->
        <div style="
          position: absolute;
          left: 0;
          top: ${x}px;
          width: 100%;
          height: ${T}px;
          background: ${d};
          border-radius: 1px;
          opacity: ${k};
          ${w?"box-shadow: 0 0 8px "+d+";":""}
        "></div>
      </div>
    `}).join("")}function Hr(e,t,r){const n=e.querySelector(".live-price");if(n){const s=parseFloat(n.textContent.replace(/[^0-9.-]/g,"")),l=t.close;n.textContent=B(l),s!==l&&(n.style.transition="color 0.3s",n.style.color=l>s?"#09C285":"#FF4D4F",setTimeout(()=>{n.style.color=""},500))}const a=e.querySelector(".current-candle-status"),i=e.querySelector(".current-candle-indicator"),c=e.querySelector(".candle-pulse-dot");a&&(a.textContent=t.isGreen?"GREEN":"RED",a.style.color=t.isGreen?"#09C285":"#FF4D4F"),i&&(i.style.background=t.isGreen?"rgba(9, 194, 133, 0.15)":"rgba(255, 77, 79, 0.15)"),c&&(c.style.background=t.isGreen?"#09C285":"#FF4D4F");const o=X.get(r);if(o&&o.length>0){const s=o[o.length-1];t.openTime===s.openTime?o[o.length-1]={...s,high:Math.max(s.high,t.high),low:Math.min(s.low,t.low),close:t.close,isGreen:t.isGreen,isClosed:t.isClosed}:(t.isClosed||t.openTime>s.openTime)&&(o.push({openTime:t.openTime,open:t.open,high:t.high,low:t.low,close:t.close,closeTime:t.closeTime,isGreen:t.isGreen,isClosed:t.isClosed}),o.length>15&&o.shift());const l=e.querySelector(".candle-chart");l&&(l.innerHTML=$t(o))}t.isClosed&&console.log(`Candle closed for ${r}:`,t.isGreen?"GREEN":"RED")}function je(e,t,r,n){const{prediction:a,targetCandleOpenTime:i,unsub:c}=n,o=n.button;if(r.openTime!==i)return;if(c&&c(),n.timerInterval){clearInterval(n.timerInterval),n.timerInterval=null;const g=document.getElementById(`candle-tracker-${t}`);g&&g.remove()}const d=r.close>r.open===(a==="green");n.customStatus=d?"won":"lost";const p=o&&document.body.contains(o);d?p?(o.innerHTML="🎉 Claim Reward",o.style.background="linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",o.style.color="#000",o.disabled=!1,o.onclick=()=>Bt(t,n,o,e),jr(o)):console.log("User won but button missing - waiting for reconnect"):p?(o.innerHTML="❌ Lost",o.style.background="#666",o.style.opacity="0.7",setTimeout(()=>{document.body.contains(o)&&(At(o),q.delete(e),saveActiveBets())},3e3)):(q.delete(e),saveActiveBets())}async function Rr(e,t,r,n,a,i){if(!M.getState().connected){alert("Please connect your wallet first!");return}for(const s of q.keys())if(s.startsWith(`${e}-`)){alert(`You already have an active prediction for ${e}. Please wait for it to settle.`);return}const o=`${e}-${n}`;if(!a||a<=0){alert("Please enter a valid wager amount!");return}if(a<.01){alert("Minimum wager is 0.01 USDT");return}i.disabled=!0,i.innerHTML='<div class="loading"></div>';try{const s=await pr({token:e,isGreen:t==="green",timeframe:n,wagerAmount:a}),l=n*60*1e3;let d;const p=X.get(e);if(p&&p.length>0)d=p[p.length-1].openTime;else{const h=Date.now();d=Math.floor(h/l)*l}const g=d+l*2,m={prediction:t,wagerAmount:a,targetCandleOpenTime:d+l,button:i,timerInterval:null,predictionId:s.predictionId,entryPriceRef:p&&p.length>0?p[p.length-1].close:0,symbol:e,timeframe:n,key:o},y=()=>{const h=m.button,x=Date.now(),T=m.targetCandleOpenTime,w=T+l,C=(window.location.hash.replace("#","")||"/")==="/predict-candle";if(x>=w){clearInterval(m.timerInterval),h&&document.body.contains(h)&&(h.innerHTML="⏳ Checking...");const L=document.getElementById(`candle-tracker-${e}`);L&&L.remove();return}const z=x<T,b=Math.max(0,(z?T:w)-x),E=Math.floor(b/36e5),$=Math.floor(b%36e5/6e4),H=Math.floor(b%6e4/1e3);let F="";if(E>0?F=`${E}:${$.toString().padStart(2,"0")}:${H.toString().padStart(2,"0")}`:F=`${$}:${H.toString().padStart(2,"0")}`,C&&h&&document.body.contains(h)){const L=X.get(e),N=L&&L.length>0?B(L[L.length-1].close):"";z?(h.innerHTML=`<span style="opacity:0.8;">Starts in</span> ${F}`,h.style.background="#3B82F6"):(h.innerHTML=`
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span>Live: ${F}</span>
                <span style="opacity: 0.6;">|</span>
                <span>${N}</span>
              </div>
            `,h.style.background=t==="green"?"#09C285":"#FF4D4F")}if(C){const L=document.getElementById(`tracker-item-${e}`);L&&L.remove()}else{const L=Lt();Pt(L,e,t,b,z?"Starting in...":"Your candle prediction is Live","compact",m)}};m.timerInterval=setInterval(y,1e3),y(),window.addEventListener("hashchange",y);const u=$e[n],v=Te(e,u,h=>{h.isClosed&&je(o,e,h,m)});m.unsub=v,q.set(o,m),saveActiveBets()}catch(s){i.disabled=!1,i.innerHTML="Select Green or Red",i.style.background="#3B82F6",alert(`❌ Error: ${s.message}`)}}function Lt(){let e=document.getElementById("active-bets-tracker-container");return e||(e=document.createElement("div"),e.id="active-bets-tracker-container",e.style.cssText=`
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none; /* Let clicks pass through gaps */
        `,document.body.appendChild(e)),e}function Pt(e,t,r,n,a,i,c){const o=`tracker-item-${t}`;let s=document.getElementById(o);s||(s=document.createElement("div"),s.id=o,s.style.cssText=`
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            color: white;
            font-family: var(--font-primary);
            overflow: hidden;
            pointer-events: auto;
            transition: all 0.3s ease;
            animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            min-width: 260px;
        `,s.addEventListener("click",()=>{window.location.hash!=="#/predict-candle"&&(window.location.hash="#/predict-candle")}),e.appendChild(s));const l=Math.floor(n/36e5),d=Math.floor(n%36e5/6e4),p=Math.floor(n%6e4/1e3);let g="";l>0?g=`${l}:${d.toString().padStart(2,"0")}:${p.toString().padStart(2,"0")}`:g=`${d}:${p.toString().padStart(2,"0")}`;const m=r==="green"?"#09C285":"#FF4D4F";s.innerHTML=`
            <div style="display: flex; align-items: center; justify-content: center; color: ${m}; margin-right: 12px;">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                 <polyline points="16 7 22 7 22 13"></polyline>
               </svg>
            </div>
            <span style="font-family: var(--font-primary); font-weight: 600; font-size: 0.95rem; color: #fff; margin-right: 12px; white-space: nowrap;">${a}</span>
            <span style="
                display: flex; align-items: center; justify-content: center;
                min-width: 54px; height: 26px; padding: 0 8px;
                background: ${r==="green"?"#09C285":"#FF4D4F"};
                color: white; border-radius: 6px;
                font-size: 0.85rem; font-weight: 700;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                font-family: monospace;
            ">${g}</span>
        `,s.style.padding="12px 20px",s.style.minWidth="auto",s.style.display="flex",s.style.alignItems="center",s.style.flexDirection="row"}function Bt(e,t,r,n){r.disabled=!0,r.innerHTML='<div class="loading"></div>',setTimeout(()=>{const a=(t.wagerAmount*1.9).toFixed(2);alert(`🎉 Congratulations! You won $${a} USDC!`),At(r),n&&q.delete(n)},1500)}function At(e){e.innerHTML="Select Green or Red",e.style.background="#3B82F6",e.style.color="white",e.style.opacity="0.5",e.disabled=!0,e.onclick=null}function jr(e){const t=e.closest(".card");if(!t)return;const r=document.createElement("div");r.style.cssText=`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 100;
  `,t.style.position="relative",t.appendChild(r);const n=["#FFD700","#FFA500","#09C285","#FF4D4F","#3B82F6","#FF69B4","#00FFFF"];for(let a=0;a<50;a++){const i=document.createElement("div"),c=n[Math.floor(Math.random()*n.length)],o=Math.random()*8+4,s=Math.random()*100,l=Math.random()*.5,d=Math.random()*1+1.5,p=Math.random()*360,g=(Math.random()-.5)*200;i.style.cssText=`
      position: absolute;
      width: ${o}px;
      height: ${o}px;
      background: ${c};
      left: ${s}%;
      bottom: 20%;
      border-radius: ${Math.random()>.5?"50%":"2px"};
      opacity: 1;
      transform: rotate(${p}deg);
      animation: confettiFall ${d}s ease-out ${l}s forwards;
      --x-offset: ${g}px;
    `,r.appendChild(i)}setTimeout(()=>{r.remove()},3e3)}const zt=document.createElement("style");zt.textContent=`
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
`;document.head.appendChild(zt);const qr=["BTC","ETH","SOL","BNB","XRP","DOGE","ADA","AVAX","LINK","POL","DOT","PEPE"],_r=[{label:"5m",value:5},{label:"15m",value:15},{label:"30m",value:30},{label:"1h",value:60},{label:"4h",value:240},{label:"1D",value:1440}],Gr=[{label:"10m",value:10},{label:"30m",value:30},{label:"1h",value:60},{label:"4h",value:240}],pe={BTC:{name:"Bitcoin",image:"https://assets.coingecko.com/coins/images/1/small/bitcoin.png"},ETH:{name:"Ethereum",image:"https://assets.coingecko.com/coins/images/279/small/ethereum.png"},SOL:{name:"Solana",image:"https://assets.coingecko.com/coins/images/4128/small/solana.png"},BNB:{name:"BNB",image:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png"},XRP:{name:"XRP",image:"https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png"},DOGE:{name:"Dogecoin",image:"https://assets.coingecko.com/coins/images/5/small/dogecoin.png"},ADA:{name:"Cardano",image:"https://assets.coingecko.com/coins/images/975/small/cardano.png"},AVAX:{name:"Avalanche",image:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png"},LINK:{name:"Chainlink",image:"https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png"},POL:{name:"Polygon",image:"https://assets.coingecko.com/coins/images/4713/small/polygon.png"},DOT:{name:"Polkadot",image:"https://assets.coingecko.com/coins/images/12171/small/polkadot.png"},PEPE:{name:"Pepe",image:"https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg"}},Wr=5;let O=[],qe=[],Le=[],Pe=[],_e="recent",_=null,ne=null,ae=5;function Vr(){_=null,ne=null,ae=5;const e=document.createElement("div");e.className="pvp-battle-page",e.style.cssText=`
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
      Predict <span style="color: #09C285; font-weight: 600;">UP</span> or <span style="color: #EF4444; font-weight: 600;">DOWN</span>. Find an opponent. <strong>Winner takes all!</strong>
    </p>
  `,t.appendChild(r);const n=document.createElement("style");n.textContent=`
    #pvp-token-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: var(--spacing-xl);
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }
    @media (max-width: 800px) {
      #pvp-token-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 600px) {
      #pvp-token-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `,t.appendChild(n);const a=document.createElement("div");a.id="pvp-token-grid",t.appendChild(a);const i=document.createElement("div");i.id="pvp-backdrop",i.style.cssText=`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  `,i.addEventListener("click",()=>{document.querySelectorAll(".pvp-token-card.expanded").forEach(g=>collapseCard(g))}),e.appendChild(i);const c=document.createElement("div");c.id="pvp-betting-modal",c.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 90%;
    max-width: 360px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 24px;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,e.appendChild(c),i.addEventListener("click",()=>{Ge()}),e.appendChild(t);const o=document.createElement("div");o.id="open-bets-panel",o.style.cssText=`
    width: 380px;
    height: calc(100vh - 64px);
    background: linear-gradient(180deg, rgba(5, 15, 25, 0.98) 0%, rgba(10, 20, 30, 0.95) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-left: 1px solid rgba(9, 194, 133, 0.3);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,o.innerHTML=`
    <style>
      @keyframes radar-sweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes blip-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
      }
      @keyframes blip-appear {
        from { transform: scale(0); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .radar-panel-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
        border-bottom: 1px solid rgba(9, 194, 133, 0.2);
      }
      .radar-panel-title h3 {
        font-size: 0.9rem;
        font-weight: 700;
        color: #09C285;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .radar-container {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto var(--spacing-sm);
      }
      .radar-bg {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(9, 194, 133, 0.05) 0%, rgba(9, 194, 133, 0.02) 50%, transparent 70%);
        border: 1px solid rgba(9, 194, 133, 0.3);
      }
      .radar-grid {
        position: absolute;
        inset: 0;
        border-radius: 50%;
      }
      .radar-ring {
        position: absolute;
        border: 1px solid rgba(9, 194, 133, 0.12);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .radar-line {
        position: absolute;
        width: 1px;
        height: 100%;
        left: 50%;
        top: 0;
        background: rgba(9, 194, 133, 0.08);
      }
      .radar-sweep {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: conic-gradient(from 0deg, transparent 0deg, rgba(9, 194, 133, 0.35) 25deg, transparent 50deg);
        animation: radar-sweep 3s linear infinite;
      }
      .radar-center {
        position: absolute;
        width: 6px;
        height: 6px;
        background: #09C285;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 15px rgba(9, 194, 133, 0.8);
      }
      .radar-blip {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: blip-pulse 2s ease-in-out infinite, blip-appear 0.3s ease-out;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6px;
        font-weight: bold;
        color: white;
      }
      .radar-blip:hover {
        transform: translate(-50%, -50%) scale(1.4);
        z-index: 10;
      }
      .radar-blip.long {
        background: rgba(9, 194, 133, 0.9);
        box-shadow: 0 0 8px rgba(9, 194, 133, 0.6);
      }
      .radar-blip.short {
        background: rgba(239, 68, 68, 0.9);
        box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
      }
      .radar-legend {
        display: flex;
        justify-content: center;
        gap: var(--spacing-md);
        font-size: 0.65rem;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text-muted);
      }
      .legend-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .legend-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
      .legend-dot.long { background: #09C285; }
      .legend-dot.short { background: #EF4444; }
      .signals-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        background: rgba(9, 194, 133, 0.08);
        border-radius: 6px;
        border: 1px solid rgba(9, 194, 133, 0.15);
        margin-bottom: var(--spacing-xs);
      }
      .signals-header span {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }
      #open-bets-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding-right: 4px;
      }
      #open-bets-list::-webkit-scrollbar {
        width: 4px;
      }
      #open-bets-list::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.05);
        border-radius: 2px;
      }
      #open-bets-list::-webkit-scrollbar-thumb {
        background: rgba(9, 194, 133, 0.3);
        border-radius: 2px;
      }
      #open-bets-list::-webkit-scrollbar-thumb:hover {
        background: rgba(9, 194, 133, 0.5);
      }
    </style>
    
    <div class="radar-panel-title">
      <h3>🛰️ Live Bet Radar</h3>
      <span id="open-bets-count" style="background: linear-gradient(135deg, #09C285 0%, #07a371 100%); color: white; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700;">0</span>
    </div>
    
    <div class="radar-container">
      <div class="radar-bg"></div>
      <div class="radar-grid">
        <div class="radar-ring" style="width: 33%; height: 33%;"></div>
        <div class="radar-ring" style="width: 66%; height: 66%;"></div>
        <div class="radar-ring" style="width: 100%; height: 100%;"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(0deg);"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(45deg);"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(90deg);"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(135deg);"></div>
      </div>
      <div class="radar-sweep"></div>
      <div class="radar-center"></div>
      <div id="radar-blips"></div>
    </div>
    
    <div class="radar-legend">
      <div class="legend-item">
        <div class="legend-dot long"></div>
        <span>UP</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot short"></div>
        <span>DOWN</span>
      </div>
    </div>
    
    <div class="signals-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);">
      <span style="font-weight: 700; color: var(--color-text-primary);">Active Signals</span>
      <select id="bets-sort-select" style="
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        color: var(--color-text-secondary);
        font-size: 0.75rem;
        border-radius: 6px;
        padding: 4px 8px;
        outline: none;
        cursor: pointer;
      ">
        <option value="recent">Recent</option>
        <option value="long">Up Only</option>
        <option value="short">Down Only</option>
      </select>
    </div>
    
    <div id="open-bets-list" style="
        flex: 1; 
        overflow-y: auto; 
        padding-right: 4px; 
        display: flex; 
        flex-direction: column; 
        gap: 8px;
        min-height: 0;
    "></div>

    <div id="my-bets-footer" style="
      margin-top: auto;
      padding-top: var(--spacing-md);
      border-top: 1px solid rgba(9, 194, 133, 0.2);
    ">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <span style="width: 6px; height: 6px; background: #3B82F6; border-radius: 50%;"></span>
        YOUR ACTIVE BETS
      </div>
      <div id="my-bets-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 150px; overflow-y: auto;"></div>
    </div>
  `,e.appendChild(o);const s=document.createElement("div");s.id="accept-match-modal",s.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 90%;
    max-width: 380px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 24px;
    z-index: 1001;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,e.appendChild(s);const l=document.createElement("div");l.id="cancel-match-modal",l.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 90%;
    max-width: 340px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 20px;
    padding: 24px;
    z-index: 1002;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  `,e.appendChild(l);const d=o.querySelector("#bets-sort-select");d&&d.addEventListener("change",g=>{_e=g.target.value,fe()}),Yr(a);const p=setInterval(ln,1e4);return Pe.push(()=>clearInterval(p)),Qr(),e.addEventListener("DOMNodeRemovedFromDocument",Dt),e}function Dt(){Pe.forEach(e=>e()),Pe=[]}async function Yr(e){e.innerHTML='<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>',Dt();try{const t=await Q(qr);if(t.length>0){const r=t.map(n=>{var a,i;return{symbol:n.symbol,name:((a=pe[n.symbol])==null?void 0:a.name)||n.symbol,image:((i=pe[n.symbol])==null?void 0:i.image)||n.image,price:n.price,priceChange24h:n.priceChange24h}});Xr(r,e),r.forEach(n=>{const a=Be(n.symbol,i=>{Zr(n.symbol,i.price,i.priceChange24h)});Pe.push(a)}),console.log("🟢 PvP Tokens loaded with real-time updates")}else throw new Error("No tokens loaded")}catch(t){console.error("Failed to load PvP tokens:",t),e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `}}function Xr(e,t){t.innerHTML="",e.forEach(r=>{const n=Kr(r);t.appendChild(n)})}function Kr(e){const t=document.createElement("div");t.className="pvp-token-card",t.dataset.symbol=e.symbol;const r=J(e.priceChange24h);return t.style.cssText=`
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: var(--spacing-md);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-xs);
    position: relative;
    overflow: hidden;
    height: 100%;
  `,t.innerHTML=`
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(9, 194, 133, 0.08) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s;" class="card-glow"></div>
    <img src="${e.image}" alt="${e.name}" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'" />
    <div>
      <div style="font-weight: 700; font-size: 1.1rem; letter-spacing: 0.5px;">${e.symbol}</div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted);">${e.name}</div>
    </div>
    <div style="margin-top: var(--spacing-xs);">
      <div class="token-price" style="font-weight: 600; font-size: 1rem;">${B(e.price)}</div>
      <div class="token-change ${r}" style="font-size: 0.85rem; font-weight: 500;">${Z(e.priceChange24h)}</div>
    </div>
  `,t.addEventListener("mouseenter",()=>{t.style.borderColor="rgba(9, 194, 133, 0.5)",t.style.transform="translateY(-4px)",t.style.boxShadow="0 12px 40px rgba(9, 194, 133, 0.15)",t.querySelector(".card-glow").style.opacity="1"}),t.addEventListener("mouseleave",()=>{t.style.borderColor="rgba(255, 255, 255, 0.08)",t.style.transform="none",t.style.boxShadow="none",t.querySelector(".card-glow").style.opacity="0"}),t.addEventListener("click",()=>{tn(e)}),t}function Zr(e,t,r){const n=document.querySelector(`.pvp-token-card[data-symbol="${e}"]`);if(!n)return;const a=n.querySelector(".token-price"),i=n.querySelector(".token-change");a&&(a.textContent=B(t)),i&&(i.textContent=Z(r),i.className=`token-change ${J(r)}`)}async function Jr(e=5,t=30){var a;const r=M.getState();if(!r.connected){alert("Please connect your wallet first!");return}if(!_||!ne||ae<=0)return;const n=document.getElementById("modal-submit-btn");n&&(n.disabled=!0,n.innerHTML='<div class="loading"></div> Submitting...');try{await new Promise(s=>setTimeout(s,800)),console.log(`[Mock] Deducting $${ae} USDC from wallet...`);const i={id:Date.now().toString(),symbol:_.symbol,name:_.name,image:_.image,direction:ne,amount:ae,duration:e,expiryTime:Date.now()+t*60*1e3,startPrice:0,timestamp:Date.now(),user:r.address,status:"open"},c=ne==="up"?"down":"up",o=O.find(s=>s.symbol===i.symbol&&s.direction===c&&s.amount===i.amount&&s.status==="open");if(o){let s;try{s=((a=(await Q([i.symbol]))[0])==null?void 0:a.price)||_.price}catch{s=_.price}o.status="matched",o.startPrice=s,i.status="matched",i.startPrice=s;const l={id:Date.now().toString(),player1:o,player2:i,startTime:Date.now(),endTime:Date.now()+Wr*60*1e3,symbol:i.symbol,startPrice:s};Le.push(l),O=O.filter(d=>d.id!==o.id),It(l),Nt(l)}else O.unshift(i),qe.push(i),nn(i);fe()}catch(i){alert(`Error: ${i.message}`),n&&(n.disabled=!1,n.textContent=`Place ${ne.toUpperCase()} Bet ($${ae})`)}}function Qr(){O=[{id:"1",symbol:"BTC",name:"Bitcoin",image:pe.BTC.image,direction:"up",amount:5,startPrice:0,timestamp:Date.now()-12e4,user:"0x1a2b...3c4d",status:"open"},{id:"2",symbol:"ETH",name:"Ethereum",image:pe.ETH.image,direction:"down",amount:10,startPrice:0,timestamp:Date.now()-6e4,user:"0x5e6f...7g8h",status:"open"},{id:"3",symbol:"SOL",name:"Solana",image:pe.SOL.image,direction:"up",amount:5,startPrice:0,timestamp:Date.now()-3e4,user:"0x9i0j...1k2l",status:"open"}],fe()}function Ft(e){O=O.filter(t=>t.id!==e),qe=qe.filter(t=>t.id!==e),fe()}function fe(){const e=document.getElementById("open-bets-list"),t=document.getElementById("open-bets-count"),r=document.getElementById("radar-blips");if(!e)return;let n=O.filter(l=>l.status==="open");if(_e==="long"?n=n.filter(l=>l.direction==="up"):_e==="short"&&(n=n.filter(l=>l.direction==="down")),n.sort((l,d)=>d.timestamp-l.timestamp),t&&(t.textContent=n.length),r){const l=M.getState(),d=l.connected?l.address.slice(0,6)+"..."+l.address.slice(-4):null;n.length===0?r.innerHTML="":(r.innerHTML=n.map((p,g)=>{const m=p.direction==="up",y=d&&p.user===d,u=(parseInt(p.id)*137.5+g*45)%360,v=20+parseInt(p.id)*17%40,h=75+v*Math.cos(u*Math.PI/180),x=75+v*Math.sin(u*Math.PI/180);return`
          <div class="radar-blip ${y?"own":m?"long":"short"}" 
               style="left: ${h}px; top: ${x}px; animation-delay: ${g*.15}s; ${y?"width: 14px; height: 14px; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); box-shadow: 0 0 10px rgba(59, 130, 246, 0.8); border: 2px solid white;":""}"
               data-bet-id="${p.id}"
               title="${y?"YOUR BET: ":""}${p.symbol} ${m?"LONG":"SHORT"} $${p.amount}">
            ${y?'<span style="font-size: 5px;">YOU</span>':""}
          </div>
        `}).join(""),r.querySelectorAll(".radar-blip").forEach(p=>{p.addEventListener("click",()=>{const g=p.dataset.betId,m=e.querySelector(`[data-bet-id="${g}"]`);m&&(m.scrollIntoView({behavior:"smooth",block:"center"}),m.style.borderColor="#09C285",m.style.boxShadow="0 0 20px rgba(9, 194, 133, 0.3)",setTimeout(()=>{m.style.borderColor="var(--glass-border)",m.style.boxShadow="none"},2e3))})}))}if(n.length===0){e.innerHTML=`
      <div style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--spacing-sm); opacity: 0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8M12 8v8"></path>
        </svg>
        <div>No signals detected</div>
        <div style="font-size: 0.85rem; margin-top: var(--spacing-xs);">Be the first to broadcast a bet!</div>
      </div>
    `;return}const a=M.getState(),i=a.connected?a.address.slice(0,6)+"..."+a.address.slice(-4):null,c=n.filter(l=>!i||l.user!==i),o=n.filter(l=>i&&l.user===i);c.length===0?e.innerHTML=`
      <div style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--spacing-sm); opacity: 0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8M12 8v8"></path>
        </svg>
        <div>No signals active</div>
        <div style="font-size: 0.85rem; margin-top: var(--spacing-xs);">Be the first to broadcast a bet!</div>
      </div>
    `:e.innerHTML=c.map(l=>{const d=on(l.timestamp),p=l.direction==="up",g=p?"#09C285":"#EF4444",m=p?"↑":"↓",y=p?"UP":"DOWN";return`
        <div class="open-bet-card" data-bet-id="${l.id}" style="
          background: rgba(9, 194, 133, 0.05);
          border: 1px solid rgba(9, 194, 133, 0.15);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        ">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <img src="${l.image}" alt="${l.symbol}" style="width: 24px; height: 24px; border-radius: 50%;" onerror="this.style.display='none'" />
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.85rem;">${l.symbol}</div>
              <div style="font-size: 0.7rem; color: var(--color-text-muted);">${l.user}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 700; font-size: 0.8rem; color: ${g};">${m} ${y}</div>
              <div style="font-size: 0.75rem; font-weight: 600;">$${l.amount}</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--spacing-xs); padding-top: var(--spacing-xs); border-top: 1px solid rgba(255,255,255,0.05);">
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">${d}</span>
            <button class="accept-bet-btn" data-bet-id="${l.id}" style="
              padding: 3px 10px;
              font-size: 0.7rem;
              background: ${p?"rgba(239, 68, 68, 0.2)":"rgba(9, 194, 133, 0.2)"};
              color: ${p?"#EF4444":"#09C285"};
              border: 1px solid ${p?"rgba(239, 68, 68, 0.3)":"rgba(9, 194, 133, 0.3)"};
              border-radius: var(--radius-sm);
              cursor: pointer;
              font-weight: 600;
              transition: all 0.2s;
            ">CHALLENGE</button>
          </div>
        </div>
      `}).join("");const s=document.getElementById("my-bets-list");s&&(o.length===0?s.innerHTML=`
        <div style="font-size: 0.8rem; color: var(--color-text-muted); text-align: center; padding: 16px; border: 1px dashed rgba(255,255,255,0.15); border-radius: 8px;">
          You have no active bets.
        </div>
      `:s.innerHTML=o.map(l=>{const d=l.direction==="up",p=d?"#09C285":"#EF4444",g=d?"↑":"↓",m=d?"UP":"DOWN";return`
          <div class="my-bet-card" style="
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: var(--radius-md);
            padding: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          ">
            <img src="${l.image}" alt="${l.symbol}" style="width: 20px; height: 20px; border-radius: 50%;" onerror="this.style.display='none'" />
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.8rem;">${l.symbol}</div>
              <div style="font-size: 0.7rem; font-weight: 700; color: ${p};">${g} ${m} <span style="color: var(--color-text-primary); margin-left: 4px;">$${l.amount}</span></div>
            </div>
            <button class="cancel-bet-btn" data-bet-id="${l.id}" style="
              padding: 4px 8px;
              font-size: 0.65rem;
              background: rgba(239, 68, 68, 0.2);
              color: #EF4444;
              border: 1px solid rgba(239, 68, 68, 0.3);
              border-radius: 4px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            ">CANCEL</button>
          </div>
        `}).join(""),s.querySelectorAll(".cancel-bet-btn").forEach(l=>{l.addEventListener("click",d=>{d.stopPropagation(),sn(l.dataset.betId)})})),e.querySelectorAll(".open-bet-card").forEach(l=>{l.addEventListener("mouseenter",()=>{l.style.borderColor="rgba(9, 194, 133, 0.4)",l.style.background="rgba(9, 194, 133, 0.1)"}),l.addEventListener("mouseleave",()=>{l.style.borderColor="rgba(9, 194, 133, 0.15)",l.style.background="rgba(9, 194, 133, 0.05)"})}),e.querySelectorAll(".accept-bet-btn").forEach(l=>{l.addEventListener("click",d=>{d.stopPropagation(),en(l.dataset.betId)}),l.addEventListener("mouseenter",()=>{l.style.transform="scale(1.05)"}),l.addEventListener("mouseleave",()=>{l.style.transform="scale(1)"})})}async function en(e){const t=O.find(v=>v.id===e);if(!t)return;const r=document.getElementById("accept-match-modal"),n=document.getElementById("pvp-backdrop");if(!r||!n)return;const a=t.direction==="up",i=a?"DOWN":"UP",c=a?"#EF4444":"#09C285",o=a?"#09C285":"#EF4444";let s="0.00",l="USDC";try{s=await M.getUSDCBalance()}catch(v){console.error("Failed to load balance",v)}r.innerHTML=`
    <button type="button" class="close-accept-modal" style="position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; border: none; background: rgba(255,255,255,0.1); color: var(--color-text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s;">×</button>
    
    <div style="text-align: center; margin-bottom: 24px;">
      <h2 style="font-size: 1.5rem; margin: 0 0 8px 0; background: linear-gradient(135deg, #F0F0F0 0%, #A0A0A0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Accept Challenge</h2>
      <div style="color: var(--color-text-muted); font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 6px;">
        <span style="opacity: 0.7;">VS</span> 
        <span style="color: var(--color-text-primary); font-weight: 600;">${t.user}</span>
      </div>
    </div>

    <!-- VS Card -->
    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px;">
      
      <!-- Opponent -->
      <div style="text-align: center; flex: 1;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); margin-bottom: 8px;">Opponent</div>
        <div style="font-weight: 800; color: ${o}; font-size: 1.25rem; margin-bottom: 4px;">${t.direction.toUpperCase()}</div>
        <div style="font-size: 0.9rem; font-family: 'Space Grotesk', sans-serif; opacity: 0.9;">$${t.amount}</div>
      </div>

      <!-- Divider -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 12px;">
         <div style="width: 1px; height: 40px; background: rgba(255,255,255,0.1);"></div>
         <div style="background: rgba(255,255,255,0.1); color: var(--color-text-muted); font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 12px; margin: -20px 0;">VS</div>
      </div>

      <!-- You -->
      <div style="text-align: center; flex: 1;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); margin-bottom: 8px;">You</div>
        <div style="font-weight: 800; color: ${c}; font-size: 1.25rem; margin-bottom: 4px;">${i}</div>
        <div style="font-size: 0.9rem; font-family: 'Space Grotesk', sans-serif; opacity: 0.9;" id="match-your-amount">$${t.amount}</div>
      </div>
    </div>

    <!-- Amount Input & Slider -->
    <div style="margin-top: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <label style="font-size: 0.85rem; color: var(--color-text-muted); font-weight: 500;">Match Amount</label>
        <div style="font-size: 0.8rem; color: var(--color-text-secondary);">
          Balance: <span style="color: var(--color-primary); font-family: monospace;">${s} ${l}</span>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 12px;">
        <!-- Small Input -->
        <div style="position: relative; width: 140px;">
            <span style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--color-text-secondary); font-weight: 600;">$</span>
            <input type="number" id="match-amount-input" value="${t.amount}" min="${t.amount}" step="1" style="
            width: 100%;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px 12px 12px 32px;
            color: white;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            outline: none;
            transition: all 0.2s;
            -moz-appearance: textfield;
            appearance: textfield;
            ">
            <style>
                #match-amount-input::-webkit-outer-spin-button,
                #match-amount-input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            </style>
        </div>

        <!-- Slider -->
        <div style="flex: 1; display: flex; align-items: center;">
            <input type="range" id="match-amount-slider" min="${t.amount}" max="${Math.max(t.amount*5,100)}" value="${t.amount}" step="1" style="
                width: 100%;
                cursor: pointer;
                accent-color: #09C285;
                height: 6px;
                background: rgba(255,255,255,0.1);
                border-radius: 3px;
                outline: none;
            ">
        </div>
      </div>

      <p id="match-error" style="color: #EF4444; font-size: 0.8rem; margin: 8px 0 0 0; display: none; display: flex; align-items: center; gap: 4px;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
        Amount must be at least $${t.amount}
      </p>
    </div>

    <!-- Confirm Button -->
    <button id="confirm-match-btn" style="
      width: 100%;
      padding: 18px;
      border: none;
      border-radius: 16px;
      background: linear-gradient(135deg, #09C285 0%, #07a371 100%);
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      margin-top: 24px;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(9, 194, 133, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    "> Submit ($${t.amount})</button>
  `;const d=r.querySelector("#match-amount-input"),p=r.querySelector("#match-amount-slider"),g=r.querySelector("#confirm-match-btn"),m=r.querySelector("#match-error"),y=r.querySelector("#match-your-amount"),u=v=>{y.textContent=`$${v||0}`,isNaN(v)||(g.innerHTML=` Submit ($${v})`),isNaN(v)||v<t.amount?(m.style.display="flex",g.disabled=!0,g.style.opacity="0.5",g.style.cursor="not-allowed"):(m.style.display="none",g.disabled=!1,g.style.opacity="1",g.style.cursor="pointer")};d.addEventListener("input",()=>{const v=parseFloat(d.value);p.value=isNaN(v)?t.amount:v,u(v)}),p.addEventListener("input",()=>{const v=parseFloat(p.value);d.value=v,u(v)}),g.addEventListener("click",()=>{const v=parseFloat(d.value);!isNaN(v)&&v>=t.amount&&(rn(t.id,v),lt())}),r.querySelector(".close-accept-modal").addEventListener("click",lt),r.style.opacity="1",r.style.transform="translate(-50%, -50%) scale(1)",r.style.pointerEvents="auto",n.style.opacity="1",n.style.pointerEvents="auto"}function lt(){const e=document.getElementById("accept-match-modal"),t=document.getElementById("pvp-backdrop");e&&t&&(e.style.opacity="0",e.style.transform="translate(-50%, -50%) scale(0.9)",e.style.pointerEvents="none",t.style.opacity="0",t.style.pointerEvents="none")}function Ge(){const e=document.getElementById("pvp-betting-modal"),t=document.getElementById("pvp-backdrop");e&&t&&(e.style.opacity="0",e.style.transform="translate(-50%, -50%) scale(0.9)",e.style.pointerEvents="none",t.style.opacity="0",t.style.pointerEvents="none",setTimeout(()=>{_=null},300))}async function tn(e){const t=document.getElementById("pvp-betting-modal"),r=document.getElementById("pvp-backdrop");if(!t||!r)return;_=e;let n=null,a=5,i=5,c=30,o=0,s=!1;const l=J(e.priceChange24h);M.getUSDCBalance().then(g=>{o=parseFloat(g),d()}).catch(g=>console.error(g)),t.innerHTML=`
    <button type="button" class="modal-close-btn" style="position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; border: none; background: rgba(255,255,255,0.1); color: var(--color-text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s;">×</button>
    
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="${e.image}" alt="${e.name}" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'" />
        <div style="text-align: left;">
          <div style="font-size: 1.25rem; font-weight: 700; line-height: 1.1;">${e.symbol}</div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted);">${e.name}</div>
        </div>
      </div>
      
      <div style="text-align: right;">
        <div style="font-size: 1.1rem; font-weight: 600;">${B(e.price)}</div>
        <div class="${l}" style="font-size: 0.85rem; font-weight: 500;">${Z(e.priceChange24h)}</div>
      </div>
    </div>
    
    <div style="width: 100%;">
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">Battle Duration</div>
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 16px;">
        ${_r.map(g=>`
          <button type="button" class="duration-btn" data-val="${g.value}" style="flex: 0 0 auto; padding: 6px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; color: var(--color-text-secondary); font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">${g.label}</button>
        `).join("")}
      </div>

      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">Expiry Time (Cancel if no match)</div>
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
        ${Gr.map(g=>`
          <button type="button" class="expiry-btn" data-val="${g.value}" style="flex: 0 0 auto; padding: 6px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; color: var(--color-text-secondary); font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">${g.label}</button>
        `).join("")}
      </div>
    </div>

    <div style="width: 100%; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">Select Direction</div>
      <div style="display: flex; gap: 12px;">
        <button type="button" class="dir-btn up" data-dir="up" style="flex: 1; padding: 16px; border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(255,255,255,0.03); cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--color-text-primary); transition: all 0.2s;">
          <span style="font-weight: 700; font-size: 1.2rem;">UP</span>
        </button>
        <button type="button" class="dir-btn down" data-dir="down" style="flex: 1; padding: 16px; border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(255,255,255,0.03); cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--color-text-primary); transition: all 0.2s;">
          <span style="font-weight: 700; font-size: 1.2rem;">DOWN</span>
        </button>
      </div>
    </div>
    
    <div style="width: 100%;">
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">Bet Amount (USDC)</div>
      <style>
        /* Hide native spin buttons */
        #bet-amount-input::-webkit-outer-spin-button,
        #bet-amount-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        #bet-amount-input {
          -moz-appearance: textfield;
        }
      </style>
      <div style="display: flex; gap: 8px;">
        <div style="flex: 1; position: relative; display: flex; align-items: center; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.03);">
            <span style="padding-left: 16px; color: var(--color-text-secondary);">$</span>
            <input type="number" id="bet-amount-input" value="${a}" min="5" step="0.5" style="
                flex: 1;
                width: 100%;
                padding: 12px;
                border: none;
                background: transparent;
                color: white;
                font-family: inherit;
                font-weight: 600;
                outline: none;
            " placeholder="Amount">
            <div style="display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.1); height: 100%;">
              <button type="button" class="step-btn inc" style="flex: 1; border: none; background: transparent; color: var(--color-text-secondary); padding: 0 10px; font-size: 10px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.1); border-top-right-radius: 10px; display: flex; align-items: center; justify-content: center;">▲</button>
              <button type="button" class="step-btn dec" style="flex: 1; border: none; background: transparent; color: var(--color-text-secondary); padding: 0 10px; font-size: 10px; cursor: pointer; border-bottom-right-radius: 10px; display: flex; align-items: center; justify-content: center;">▼</button>
            </div>
        </div>
        <button type="button" class="amount-btn active" data-amount="5" style="flex: 0 0 60px; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: transparent; color: var(--color-text-secondary); font-weight: 600; cursor: pointer; transition: all 0.2s;">$5</button>
        <button type="button" class="amount-btn" data-amount="10" style="flex: 0 0 60px; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: transparent; color: var(--color-text-secondary); font-weight: 600; cursor: pointer; transition: all 0.2s;">$10</button>
      </div>
    </div>
    
    <button type="button" id="modal-submit-btn" disabled style="width: 100%; padding: 16px; border: none; border-radius: 12px; background: linear-gradient(135deg, #09C285 0%, #07a371 100%); color: white; font-weight: 700; font-size: 1.1rem; cursor: pointer; margin-top: 8px; opacity: 0.5;">Select Direction</button>
  `;const d=()=>{const g=t.querySelector('.amount-btn[data-amount="5"]'),m=t.querySelector('.amount-btn[data-amount="10"]');g&&m&&(s?(g.textContent="+5",m.textContent="+10"):(g.textContent="$5",m.textContent="$10")),t.querySelectorAll(".amount-btn").forEach(u=>{!s&&parseFloat(u.dataset.amount)===a?(u.style.borderColor="#09C285",u.style.backgroundColor="rgba(9, 194, 133, 0.15)",u.style.color="white"):(u.style.borderColor="rgba(255,255,255,0.1)",u.style.backgroundColor="transparent",u.style.color="var(--color-text-secondary)")}),t.querySelectorAll(".dir-btn").forEach(u=>{const v=u.dataset.dir;v===n?v==="up"?(u.style.borderColor="#09C285",u.style.backgroundColor="rgba(9, 194, 133, 0.2)",u.style.color="#09C285",u.style.boxShadow="0 0 20px rgba(9, 194, 133, 0.2)"):(u.style.borderColor="#EF4444",u.style.backgroundColor="rgba(239, 68, 68, 0.2)",u.style.color="#EF4444",u.style.boxShadow="0 0 20px rgba(239, 68, 68, 0.2)"):(u.style.borderColor="rgba(255,255,255,0.1)",u.style.backgroundColor="rgba(255,255,255,0.03)",u.style.color="var(--color-text-primary)",u.style.boxShadow="none")});const y=t.querySelector("#modal-submit-btn");y.style.background="linear-gradient(135deg, #09C285 0%, #07a371 100%)",a<5?(y.disabled=!0,y.style.opacity="0.5",y.style.cursor="not-allowed",y.textContent="Min Bet is $5",y.style.background="#374151"):a>o?(y.disabled=!0,y.style.opacity="0.5",y.style.cursor="not-allowed",y.textContent="Insufficient Balance",y.style.background="#EF4444"):n?(y.disabled=!1,y.style.opacity="1",y.style.cursor="pointer",y.textContent=`Place ${n.toUpperCase()} Bet ($${a})`):(y.disabled=!0,y.style.opacity="0.5",y.style.cursor="not-allowed",y.textContent="Select Direction"),t.querySelectorAll(".duration-btn").forEach(u=>{parseInt(u.dataset.val)===i?(u.style.borderColor="var(--color-primary)",u.style.background="rgba(9, 194, 133, 0.15)",u.style.color="white"):(u.style.borderColor="rgba(255,255,255,0.1)",u.style.background="transparent",u.style.color="var(--color-text-secondary)")}),t.querySelectorAll(".expiry-btn").forEach(u=>{parseInt(u.dataset.val)===c?(u.style.borderColor="var(--color-primary)",u.style.background="rgba(9, 194, 133, 0.15)",u.style.color="white"):(u.style.borderColor="rgba(255,255,255,0.1)",u.style.background="transparent",u.style.color="var(--color-text-secondary)")})};t.querySelector(".modal-close-btn").addEventListener("click",Ge),t.querySelectorAll(".dir-btn").forEach(g=>{g.addEventListener("click",()=>{n=g.dataset.dir,d()})}),t.querySelectorAll(".amount-btn").forEach(g=>{g.addEventListener("click",()=>{const m=parseFloat(g.dataset.amount);s?a=parseFloat((a+m).toFixed(2)):a=m;const y=t.querySelector("#bet-amount-input");y&&(y.value=a),d()})});const p=t.querySelector("#bet-amount-input");p&&(p.addEventListener("input",()=>{a=parseFloat(p.value)||0,s=!0,d()}),p.addEventListener("focus",()=>p.parentElement.style.borderColor="var(--color-primary)"),p.addEventListener("blur",()=>p.parentElement.style.borderColor="rgba(255,255,255,0.1)"),t.querySelectorAll(".step-btn").forEach(g=>{g.addEventListener("click",()=>{let m=parseFloat(p.value)||0;g.classList.contains("inc")?m+=1:m-=1,m<.1&&(m=.1),p.value=parseFloat(m.toFixed(1)),p.dispatchEvent(new Event("input"))})})),t.querySelectorAll(".duration-btn").forEach(g=>{g.addEventListener("click",()=>{i=parseInt(g.dataset.val),d()})}),t.querySelectorAll(".expiry-btn").forEach(g=>{g.addEventListener("click",()=>{c=parseInt(g.dataset.val),d()})}),t.querySelector("#modal-submit-btn").addEventListener("click",async()=>{!n||a<5||(ne=n,ae=a,await Jr(i,c),Ge())}),d(),t.style.opacity="1",t.style.transform="translate(-50%, -50%) scale(1)",t.style.pointerEvents="auto",r.style.opacity="1",r.style.pointerEvents="auto"}async function rn(e,t){var a;const r=M.getState();if(!r.connected){alert("Please connect your wallet first!");return}const n=O.find(i=>i.id===e);if(!(!n||n.status!=="open")){console.log(`[Mock] Deducting $${t} USDC from acceptor...`);try{const c=((a=(await Q([n.symbol]))[0])==null?void 0:a.price)||n.startPrice,o={id:Date.now().toString(),symbol:n.symbol,name:n.name,image:n.image,direction:n.direction==="up"?"down":"up",amount:t,startPrice:c,timestamp:Date.now(),user:r.address.slice(0,6)+"..."+r.address.slice(-4),status:"matched"};n.status="matched",n.startPrice=c;const s={id:Date.now().toString(),player1:n,player2:o,startTime:Date.now(),endTime:Date.now()+n.duration*60*1e3,symbol:n.symbol,startPrice:c};Le.push(s),O=O.filter(l=>l.id!==e),It(s),Nt(s),fe()}catch(i){alert(`Error accepting bet: ${i.message}`)}}}function It(e){const t=document.createElement("div");t.style.cssText=`
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
          ${e.player1.direction==="up"?"↑ UP":"↓ DOWN"}
        </div>
      </div>
      <div style="font-size: 2rem; font-weight: 800; margin: var(--spacing-md) 0; display: flex; align-items: center; justify-content: center; gap: var(--spacing-xl);">
        <div style="color: ${e.player1.direction==="up"?"#09C285":"#EF4444"}">
          ${e.player1.direction==="up"?"↑ UP":"↓ DOWN"}
        </div>
        <div style="font-size: 1rem; opacity: 0.5;">VS</div>
        <div style="color: ${e.player2.direction==="up"?"#09C285":"#EF4444"}">
          ${e.player2.direction==="up"?"↑ UP":"↓ DOWN"}
        </div>
      </div>
    </div>
    <div style="font-size: 0.9rem; color: var(--color-text-muted);">
      Prize Pool: <strong style="color: var(--color-primary);">$${e.player1.amount+e.player2.amount}</strong>
    </div>
  `,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}function nn(e){const t=document.createElement("div");t.style.cssText=`
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
  `,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}function Nt(e){const t=document.createElement("div");t.id=`battle-tracker-${e.id}`,t.style.cssText=`
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
  `,document.body.appendChild(t);const r=async()=>{var l;const n=e.endTime-Date.now();if(n<=0){await an(e,t);return}const a=Math.floor(n/6e4),i=Math.floor(n%6e4/1e3);let c=e.startPrice;try{c=((l=(await Q([e.symbol]))[0])==null?void 0:l.price)||e.startPrice}catch{}const o=(c-e.startPrice)/e.startPrice*100,s=o>=0;t.innerHTML=`
      <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
        <span style="font-size: 1.2rem;">⚔️</span>
        <span style="font-weight: 600;">${e.symbol} Battle</span>
        <span style="margin-left: auto; font-family: monospace; font-weight: 600;">${a}:${i.toString().padStart(2,"0")}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-text-muted);">
        <span>Start: ${B(e.startPrice)}</span>
        <span style="color: ${s?"#09C285":"#EF4444"}; font-weight: 600;">
          Now: ${B(c)} (${s?"+":""}${o.toFixed(2)}%)
        </span>
      </div>
      <div style="margin-top: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--glass-border); display: flex; justify-content: space-between; font-size: 0.8rem;">
        <span style="color: ${e.player1.direction==="up"?"#09C285":"#EF4444"};">${e.player1.user}: ${e.player1.direction.toUpperCase()}</span>
        <span style="color: ${e.player2.direction==="up"?"#09C285":"#EF4444"};">${e.player2.user}: ${e.player2.direction.toUpperCase()}</span>
      </div>
    `,setTimeout(r,1e3)};r()}async function an(e,t){var s;let r=e.startPrice;try{r=((s=(await Q([e.symbol]))[0])==null?void 0:s.price)||e.startPrice}catch{}const n=(r-e.startPrice)/e.startPrice*100,a=n>0,i=n<0;let c=null;n===0||(e.player1.direction==="up"&&a||e.player1.direction==="down"&&i?(c=e.player1,e.player2):(c=e.player2,e.player1));const o=(e.player1.amount+e.player2.amount)*.97;t.innerHTML=`
    <div style="text-align: center; padding: var(--spacing-sm);">
      <div style="font-size: 2rem; margin-bottom: var(--spacing-xs);">${c?"🏆":"🤝"}</div>
      <div style="font-weight: 700; font-size: 1.1rem; color: ${c?"var(--color-primary)":"var(--color-text-primary)"};">
        ${c?`${c.user} WINS!`:"IT'S A TIE!"}
      </div>
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin: var(--spacing-xs) 0;">
        ${e.symbol}: ${B(e.startPrice)} → ${B(r)}
        <span style="color: ${n>=0?"#09C285":"#EF4444"};">(${n>=0?"+":""}${n.toFixed(2)}%)</span>
      </div>
      ${c?`
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
  `,Le=Le.filter(l=>l.id!==e.id)}function on(e){const t=Math.floor((Date.now()-e)/1e3);if(t<60)return`${t}s ago`;const r=Math.floor(t/60);return r<60?`${r}m ago`:`${Math.floor(r/60)}h ago`}function sn(e){const t=O.find(a=>a.id===e);if(!t)return;const r=document.getElementById("cancel-match-modal"),n=document.getElementById("pvp-backdrop");!r||!n||(r.innerHTML=`
    <div style="margin-bottom: 8px;">
        <div style="width: 48px; height: 48px; background: rgba(239, 68, 68, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">Cancel Prediction?</h3>
        <p style="color: var(--color-text-secondary); font-size: 0.9rem;">
            Do you want to cancel your prediction for <strong>${t.symbol}</strong>?
        </p>
    </div>
    
    <div style="display: flex; gap: 12px; margin-top: 16px;">
        <button id="cancel-no-btn" style="
            flex: 1; padding: 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
            background: rgba(255,255,255,0.05); color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;
        ">No</button>
        <button id="cancel-yes-btn" style="
            flex: 1; padding: 14px; border: none; border-radius: 12px;
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        ">Yes</button>
    </div>
  `,r.querySelector("#cancel-no-btn").onclick=ct,r.querySelector("#cancel-yes-btn").onclick=()=>{Ft(e),ct()},r.style.opacity="1",r.style.transform="translate(-50%, -50%) scale(1)",r.style.pointerEvents="auto",n.style.opacity="1",n.style.pointerEvents="auto")}function ct(){const e=document.getElementById("cancel-match-modal"),t=document.getElementById("pvp-backdrop");e&&t&&(e.style.opacity="0",e.style.transform="translate(-50%, -50%) scale(0.9)",e.style.pointerEvents="none",t.style.opacity="0",t.style.pointerEvents="none")}function ln(){const e=Date.now(),t=O.filter(r=>r.status==="open"&&r.expiryTime&&r.expiryTime<e);t.length>0&&t.forEach(r=>{console.log(`[Mock] Bet ${r.id} expired. Refunding $${r.amount}...`),Ft(r.id)})}let I=null;function cn(){return I=document.createElement("div"),I.id="pending-action-widget",I.innerHTML=`
    <div class="pending-widget-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <span class="pending-widget-text">Pending Dream Team Selection</span>
    <span class="pending-widget-badge">0</span>
  `,gn(),I.addEventListener("click",dn),Er(We),We(),document.body.appendChild(I),I}function dn(){ve().length===15?at(!0):at(!1),oe("/dream-team"),I&&(I.style.display="none")}function We(e){if(!I)return;const t=Array.isArray(e)?e:ve(),n=(window.location.hash.replace("#","")||"/")==="/dream-team";if(t.length>0&&!n){I.style.display="flex",I.classList.add("pulse");const a=I.querySelector(".pending-widget-badge");a&&(a.textContent=t.length);const i=I.querySelector(".pending-widget-text");i&&(t.length===15?(i.textContent="Dream Team Ready to Submit",a.style.background="#09C285"):(i.textContent="Pending Dream Team Selection",a.style.background="var(--color-primary)"))}else I.style.display="none",I.classList.remove("pulse")}function pn(){We()}function gn(){const e="pending-widget-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
  `,document.head.appendChild(t)}const Ze="https://gamma-api.polymarket.com";async function mn(e=20){try{const t=`${Ze}/events?limit=${e}&active=true&closed=false&order=volume24hr&ascending=false`,r=await fetch(t);if(!r.ok)throw new Error(`Polymarket API error: ${r.statusText}`);const n=await r.json();return Je(n)}catch(t){return console.error("Error fetching Polymarket data:",t),[]}}async function un({limit:e=20,active:t=!0,closed:r=!1,order:n="volume24hr",ascending:a=!1,tag_id:i="",slug:c=""}={}){try{const o=new URLSearchParams({limit:e,active:t,closed:r,order:n,ascending:a});i&&o.append("tag_id",i),c&&o.append("slug",c);let s=`${Ze}/events?${o.toString()}`;const l=await fetch(s);if(!l.ok)throw new Error(l.statusText);const d=await l.json();return Je(d)}catch(o){return console.error("Error fetching markets:",o),[]}}async function dt(e){try{const t=`${Ze}/events?q=${encodeURIComponent(e)}&active=true&closed=false&limit=20&order=volume24hr&ascending=false`,r=await fetch(t);if(!r.ok)throw new Error(r.statusText);const n=await r.json();return Je(n)}catch(t){return console.error("Error searching markets:",t),[]}}async function yn(e){return un({tag_id:e})}function Je(e){return Array.isArray(e)?e.map(t=>{var n,a,i;const r=(n=t.markets)==null?void 0:n[0];return r?{id:t.id,title:t.title,image:t.image,volume:t.volume,volume24hr:t.volume24hr,description:t.description,slug:t.slug,category:((i=(a=t.tags)==null?void 0:a[0])==null?void 0:i.label)||"General",endDate:t.endDate,outcomes:r.outcomes?JSON.parse(r.outcomes):[],outcomePrices:r.outcomePrices?JSON.parse(r.outcomePrices):[],question:r.question}:null}).filter(t=>t!==null):[]}function hn(e){return e>=1e6?"$"+(e/1e6).toFixed(2)+"M":e>=1e3?"$"+(e/1e3).toFixed(2)+"K":"$"+parseFloat(e).toFixed(2)}function vn(){const e=document.createElement("div");e.className="prediction-market-page",e.style.cssText=`
        padding: var(--spacing-xl);
        max-width: 1200px;
        margin: 0 auto;
        animation: fadeIn 0.5s ease-out;
    `;const t=document.createElement("div");t.style.cssText=`
        margin-bottom: var(--spacing-2xl);
        text-align: center;
    `,t.innerHTML=`
        <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: 12px;">
            <span style="font-size: 2.5rem;">🔮</span> Polymarket Trending
        </h1>
        <p style="color: var(--color-text-secondary); font-size: 1.1rem;">
            Top trending prediction markets happening right now
        </p>
    `,e.appendChild(t);const r=document.createElement("style");r.textContent=`
        @media (max-width: 768px) {
            .prediction-market-page {
                padding: var(--spacing-md) !important;
            }
            .prediction-grid {
                grid-template-columns: 1fr !important;
                gap: var(--spacing-md) !important;
            }
            .controls-container {
                margin-bottom: var(--spacing-lg) !important;
            }
            #market-search {
                font-size: 16px !important; /* Prevent iOS zoom on focus */
                padding: 14px 20px !important;
                padding-left: 48px !important;
            }
            .category-btn {
                padding: 10px 20px !important;
                font-size: 1rem !important;
            }
            .market-card {
                /* Ensure cards look good on small screens */
            }
        }
    `,e.appendChild(r);const n=document.createElement("div");n.className="controls-container",n.style.cssText=`
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-xl);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    `,e.appendChild(n);const a=document.createElement("div");a.style.cssText=`
        position: relative;
        width: 100%;
    `,a.innerHTML=`
        <input type="text" id="market-search" placeholder="Search markets (e.g. Trump, Crypto, NFL)..." style="
            width: 100%;
            padding: 12px 20px;
            padding-left: 48px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-full);
            color: var(--color-text-primary);
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        ">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-text-muted);
            pointer-events: none;
        ">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    `,n.appendChild(a);const i=[{id:"all",label:"Trending"},{id:"politics",label:"Politics",tagId:"2"},{id:"crypto",label:"Crypto",tagId:"21"},{id:"sports",label:"Sports",tagId:"1"},{id:"pop-culture",label:"Pop Culture"},{id:"business",label:"Business"},{id:"science",label:"Science"}],c=document.createElement("div");c.style.cssText=`
        display: flex;
        gap: var(--spacing-sm);
        overflow-x: auto;
        padding-bottom: 4px;
        scrollbar-width: none;
        justify-content: center;
    `;let o="all";i.forEach(p=>{const g=document.createElement("button");g.textContent=p.label,g.className=`category-btn ${p.id===o?"active":""}`,g.style.cssText=`
            padding: 8px 16px;
            border-radius: var(--radius-full);
            border: 1px solid var(--glass-border);
            background: ${p.id===o?"var(--color-primary)":"var(--glass-bg)"};
            color: ${p.id===o?"#000":"var(--color-text-secondary)"};
            font-size: 0.9rem;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        `,g.onclick=()=>{document.querySelectorAll(".category-btn").forEach(m=>{m.style.background="var(--glass-bg)",m.style.color="var(--color-text-secondary)"}),g.style.background="var(--color-primary)",g.style.color="#000",o=p.id,Ee(s,{category:p})},c.appendChild(g)}),n.appendChild(c);const s=document.createElement("div");s.className="prediction-grid",s.style.cssText=`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--spacing-lg);
    `,e.appendChild(s),s.innerHTML=`
        <div style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; padding: 40px;">
            <div class="loading" style="width: 40px; height: 40px; margin-bottom: 20px;"></div>
            <div style="color: var(--color-text-secondary);">Loading markets...</div>
        </div>
    `,Ee(s);const l=a.querySelector("#market-search");let d;return l.addEventListener("input",p=>{clearTimeout(d),d=setTimeout(()=>{const g=p.target.value.trim();g.length>2?Ee(s,{search:g}):g.length===0&&Ee(s,{category:i.find(m=>m.id===o)})},500)}),e}async function Ee(e,{category:t={id:"all"},search:r=""}={}){e.innerHTML=`
        <div style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; padding: 40px;">
            <div class="loading" style="width: 40px; height: 40px; margin-bottom: 20px;"></div>
            <div style="color: var(--color-text-secondary);">Loading...</div>
        </div>
    `;try{let n=[];if(r?n=await dt(r):t.id==="all"?n=await mn(20):t.tagId?n=await yn(t.tagId):n=await dt(t.label),n.length===0){e.innerHTML=`
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
                    No markets found.
                </div>
            `;return}e.innerHTML="",n.forEach(a=>{const i=fn(a);e.appendChild(i)})}catch{e.innerHTML=`
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-danger);">
                Failed to load markets.
            </div>
        `}}function fn(e){var a,i;const t=document.createElement("div");t.className="market-card",t.style.cssText=`
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        height: 100%;
    `,t.onmouseenter=()=>{t.style.transform="translateY(-4px)",t.style.borderColor="var(--color-primary)"},t.onmouseleave=()=>{t.style.transform="translateY(0)",t.style.borderColor="var(--glass-border)"};const r=(a=e.outcomePrices)!=null&&a[0]?(parseFloat(e.outcomePrices[0])*100).toFixed(0):"0",n=(i=e.outcomePrices)!=null&&i[1]?(parseFloat(e.outcomePrices[1])*100).toFixed(0):"0";return t.innerHTML=`
        <div style="padding: var(--spacing-md); display: flex; gap: var(--spacing-md); border-bottom: 1px solid var(--glass-border);">
            <img src="${e.image}" alt="Market" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; background: var(--color-bg-tertiary);">
            <div style="flex: 1;">
                <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                    ${e.category}
                </div>
                <div style="font-weight: 600; font-size: 1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${e.title}
                </div>
            </div>
        </div>
        
        <div style="padding: var(--spacing-md); flex: 1; display: flex; flex-direction: column; justify-content: flex-end;">
            
            <div style="display: flex; gap: 8px; margin-bottom: var(--spacing-md);">
                <div style="flex: 1; background: rgba(9, 194, 133, 0.1); border: 1px solid rgba(9, 194, 133, 0.3); padding: 8px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 2px;">Yes</div>
                    <div style="font-weight: 700; color: #09C285; font-size: 1.1rem;">${r}%</div>
                </div>
                <div style="flex: 1; background: rgba(255, 77, 79, 0.1); border: 1px solid rgba(255, 77, 79, 0.3); padding: 8px; border-radius: 8px; text-align: center;">
                     <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 2px;">No</div>
                    <div style="font-weight: 700; color: #FF4D4F; font-size: 1.1rem;">${n}%</div>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--color-text-secondary);">
                <div>24h Vol: <span style="color: var(--color-text-primary);">${hn(e.volume24hr)}</span></div>
                <a href="https://polymarket.com/event/${e.slug}" target="_blank" class="btn btn-sm btn-secondary" style="text-decoration: none;">View</a>
            </div>
        </div>
    `,t}let ge=null,le=null,R=null,me=null;function bn(){const e=document.createElement("div");return e.className="app",me=Yt(),e.appendChild(me),le=document.createElement("div"),le.className="app-container",ge=Xt(),le.appendChild(ge),R=document.createElement("main"),R.className="main-content",R.style.minHeight="calc(100vh - 64px)",le.appendChild(R),e.appendChild(le),cn(),pt(R),setTimeout(()=>Kt(),0),window.addEventListener("popstate",()=>{pt(R),pn()}),window.addEventListener("navigate",t=>{const r=t.detail.page;oe(`/${r}`)}),e}function pt(e){e.innerHTML="";const t=window.location.hash.slice(1)||"/",r=["/crypto-duel","/dream-team","/time-based","/predict-candle","/pvp-battle","/prediction-market"].includes(t);me&&(t==="/"?me.classList.add("home-transparent"):me.classList.remove("home-transparent")),ge&&(r?(ge.style.display="flex",R&&(R.style.marginLeft="",R.style.width="")):(ge.style.display="none",R&&(R.style.marginLeft="0",R.style.width="100%")));let n;switch(t){case"/":n=Zt();break;case"/crypto-duel":n=gr();break;case"/dream-team":n=Sr();break;case"/time-based":n=Lr();break;case"/predict-candle":n=Or();break;case"/pvp-battle":n=Vr();break;case"/prediction-market":n=vn();break;default:n=xn()}e.appendChild(n),window.scrollTo(0,0)}function xn(){const e=document.createElement("div");return e.className="container",e.style.cssText="text-align: center; padding: var(--spacing-3xl);",e.innerHTML=`
    <h1 style="font-size: 4rem; margin-bottom: var(--spacing-md);">404</h1>
    <p style="font-size: 1.5rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-xl);">
      Page not found
    </p>
    <a href="#/" class="btn btn-primary">Go Home</a>
  `,e}function oe(e){window.location.hash=e,window.dispatchEvent(new PopStateEvent("popstate"))}async function gt(){console.log("🚀 Initializing Crypto Leagues...");try{await M.autoConnect()}catch{console.log("No previous wallet connection found")}const e=bn(),t=document.getElementById("app");t?t.appendChild(e):console.error("App container not found!"),console.log("✅ Crypto Leagues initialized")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",gt):gt();
//# sourceMappingURL=index-wy-yczG_.js.map
