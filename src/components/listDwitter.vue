<template>
  <div
    v-for="value in ListaDwitterCalculate().reverse()"
    :key="value.text"
    style="border: 0.5px solid #afafaf; padding: 20px 20px 0px 20px"
  >
    <div class="flex flex-row">
      <div class="basis-1/12">
        <img v-bind:src="value.image" style="width: 20px; border-radius: 20px" />
      </div>
      <div class="basis-11/12">{{ value.owner }} | {{ value.datatime }}</div>
    </div>
    <div class="flex flex-row">
      <div class="basis-full" style="text-align: center">
        <span style>{{ value.text }}</span>
      </div>
    </div>
    <div>
      <!-- -->
      <div class="basis-full h" style="text-align: right; padding-top:20px">
        <div class="static">
          <div class="inline-block">
            <a
              class="twitter-share-button"
              v-bind:href="'https://twitter.com/intent/tweet?text=this%20is%20my%20Dwitter%20Decentralized%20 -'+value.text.substring(0,100)+' -ready%20Completed%20here&url=' + linkShare + value.id"
              target="_blank"
              style="border: 1px solid black ;"
            >
            <!-- v-bind:src"'https://twitter.com/intent/tweet?text=this%20is%20my%20Dwitter%20Decentralized%20&url=' + linkShare + value.id"
             src="https://platform.twitter.com/widgets/tweet_button.8f764d5bd2778f88121d31d7d8d8e1e3.en.html#dnt=false&amp;id=twitter-widget-1&amp;lang=en&amp;original_referer=https%3A%2F%2Fdeveloper.twitter.com%2Fen%2Fdocs%2Ftwitter-for-websites%2Ftweet-button%2Foverview&amp;size=m&amp;text=Guides%20%7C%20Docs%20%7C%20Twitter%20Developer%20Platform&amp;time=1642694716282&amp;type=share&amp;url=https%3A%2F%2Fdeveloper.twitter.com%2Fen%2Fdocs%2Ftwitter-for-websites%2Ftweet-button%2Foverview"
            -->
           Share <img class="inline-block" src="/twitter.jpg">
            </a>
          </div>
          <div class="inline-block" v-if="$isMobile()">
            <a @click="shareMobile('http://www.dwitter.xyz/id/' + value.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                />
              </svg>
            </a>
          </div>
          <div class="inline-block">
            <a @click="copytext(linkShare + value.id)" style="cursor: pointer">Copy Link</a>
            <br />
          </div>
        </div>
        <div>
          <span class="text-green-500">{{ textCopied }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import makeBlockie from "ethereum-blockies-base64";
import Dwitter from "../contracts/Dwitter.json";
import Config from "../stores/config.js";

import { ethers } from "ethers";
import feeDwitterManagment from '../contracts/feeDwitterManagment.json';

export default {
  props: {
  Dwitters: Object},
  data() {
    return {
   
      addressConnection: "",
  
      fee: "", modalshow: false,
      messaggioModal: 'prova messaggio',
      linkShare: '', textCopied: '',
    }
  },
  mounted() {
    this.linkShare = Config.linkShare;

  },
  methods: {
    ListaDwitterCalculate() {
      return this.Dwitters.map((item, index) => {
        var data = new Date(item.timestamp * 1000);

        return {
          image: makeBlockie(item.owner),
          owner: item.owner,
          datatime:
            data.getMonth() +
            1 +
            "/" +
            data.getDay() +
            "/" +
            data.getFullYear() +
            " " +
            data.getHours() +
            ":" +
            data.getMinutes() +
            ":" +
            data.getSeconds(),
          text: item.text,
          id: index,
        };
      });
    }, 
    copytext(textocpy) {
      const el = document.createElement('textarea');  
        el.value =textocpy;                                 
        el.setAttribute('readonly', '');                
        el.style.position = 'absolute';                     
        el.style.left = '-9999px';                      
        document.body.appendChild(el);                  
        const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
        el.select();                                    
        document.execCommand('copy'); 
        
        
   /*   navigator.clipboard.writeText(textocpy);*/
/*this.$refs.myinput.focus();
      document.execCommand('copy'); */
      this.textCopied = "Copied - " + textocpy;
      setTimeout(() => this.textCopied = '', 3000)
    },
    shareMobile(shareData) { navigator.share(shareData) },
  }
}
</script>





