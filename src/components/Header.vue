<script>
import Config from "../stores/config.js";
import { ethers } from "ethers";
export default {


  data() { return { addressConnection: '', img: '', cutAddress: '',showHideMenu:false, classMenu:'' } },

  mounted() {
    this.addressConnection = Config.addressConnectionglobal;
    if (this.addressConnection != '') {
      this.img = makeBlockie(this.addressConnection);
      this.cutAddress = this.addressConnection = this.addressConnection.substring(this.addressConnection.length - 4, this.addressConnection.length);
    }

  },
  methods: {
    menu(){
      this.showHideMenu=!this.showHideMenu;
      if(this.showHideMenu){this.classMenu='sm:block';}else{this.classMenu='lg:block';}
    },
    bottonSwitch(){
     //window.ethereum.SwitchEthereumChainParameter({chainId:'https://polygon-rpc.com'})
      
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }]
          })
          .then((response) => {})
          .catch(()=>{
            alert('alert Add Wallet Polygon');
          window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Matic",
              rpcUrls: ["https://polygon-rpc.com/"],
              nativeCurrency: {
                name: "Matic",
                symbol: "Matic",
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
            },
          ],
        });
        })
      /*polygon test
      web3.currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Mumbai",
              rpcUrls: ["https://rpc-mumbai.matic.today"],
              nativeCurrency: {
                name: "Matic",
                symbol: "Matic",
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
            },
          ],
        });
      }  */
      },
    ConnectWallet() {

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((response) => {

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          provider.getNetwork().then((ris)=>{console.log(ris)});
          
          Config.addressConnectionglobal = response[0];
          this.addressConnection = response[0];
          this.img = makeBlockie(this.addressConnection);
          this.cutAddress = this.addressConnection = this.addressConnection.substring(this.addressConnection.length - 4, this.addressConnection.length);

        })
        .catch((error) => {
          if (error.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(error);
          }
        });
    },

  },
}
</script>
<script setup>
import makeBlockie from "ethereum-blockies-base64";

</script>


<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
       <div class="flex items-center flex-shrink-0 text-white mr-6"> <span class="font-semibold text-xl tracking-tight">Dwitter</span>  </div>

      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" @click="menu()"
        >
     
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
        
      </div>
      <div v-bind:class="'w-full flex-grow lg:flex lg:items-center lg:w-auto hidden '+classMenu" >
        <div class="text-sm lg:flex-grow">
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            to="/"
          >Home</router-link>
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            to="/docs"
          >Docs</router-link>
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            v-if="addressConnection != ''"
            to="/my-dwitter"
          >My Dwitter</router-link>
        </div>
        <div>
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            @click="ConnectWallet()"
            v-if="addressConnection === ''"
          >Connection Wallet</a>
         
        </div>
        <div v-if="addressConnection != ''" class="static ...">
          <div class="inline-block ...">
            <img v-bind:src="img" style="width:30px; border-radius:20px" />
          </div>
          <div class="inline-block ...">...{{ cutAddress }}</div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style>
.btn {
  @apply py-1 px-2 rounded;
}
.btn-transparent {
  @apply bg-transparent text-blue-700 border border-blue-500;
}
.btn-transparent:hover {
  @apply bg-blue-500 text-white;
}
</style>