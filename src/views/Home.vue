<template>
  <div class="sm:container sm:mx-auto" style="max-width: 650px">
    <Modal :messaggio="messaggioModal" @close="showHideModal($event)" v-if="modalshow" />
    <h2>Welcome to the Decentralized MicroBlog</h2>Write indelible message inside blockchain Polygon
    <div class="flex flex-row">
      <div class="basis-full" style="text-align: center">
        <textarea
          style="width: 100%"
          v-model="testo"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
    <div class="flex flex-row">
      <div class="basis-full" style="text-align: center; font-size:10px">fee {{ fee }} Matic</div>
    </div>
    <div class="flex flex-row">
      <div class="basis-full" style="text-align: center">
        <button
          class="btn btn-blue"
          @click="writeDwitter()"
          v-if="chainIdOk"
        >Write inside Blockchain</button>
        <button
          class="btn btn-blue"
          @click="bottonSwitch()"
          v-if="!chainIdOk"
        >Switch in Polygon/Matic</button>
      </div>
    </div>
    <div>
      <ClistDwitter :Dwitters="Dwitters" />
    </div>
   <!-- <button v-on:click="trasferimentoFondi()">Trasferisci Fondi</button>-->
  </div>
</template>
<script>

import makeBlockie from "ethereum-blockies-base64";
import Dwitter from "../contracts/Dwitter.json";
import Config from "../stores/config.js";
import Modal from "../components/Modal.vue";
import { ethers } from "ethers";
import feeDwitterManagment from '../contracts/feeDwitterManagment.json';
import ClistDwitter from '../components/listDwitter.vue'


export default {
  /*Test wallet
    chainId: "0x13881",
    chainName: "Mumbai",
    rpcUrls:"https://rpc-mumbai.matic.today",
    blockExplorerUrls:"https://explorer-mumbai.maticvigil.com",
    80001
    */

  /* Mainnet
     chainId: "0x89",
     chainName: "Matic",
     rpcUrls: ["https://polygon-rpc.com/"],
     blockExplorerUrls:"https://polygonscan.com/",
     137
  */
  components: { Modal, ClistDwitter },
  data() {
    return {
      Dwitters: [],
      addressConnection: "",
      testo: '',
      fee: "", modalshow: false,
      messaggioModal: 'prova messaggio',
      linkShare: '', textCopied: '', chainIdOk: '', chainPolygon: 137,
      chainId: "0x89",
     chainName: "Matic",
     rpcUrls: ["https://polygon-rpc.com/"],
     blockExplorerUrls:"https://polygonscan.com/",
    };
  },
  mounted() {
    this.linkShare = Config.linkShare;
    this.addressConnection = Config.addressConnectionglobal;
    const provider = new ethers.getDefaultProvider(Config.irpDefault);
    let Contract = new ethers.Contract(
      Config.addressContractDwitter,
      Dwitter.abi,
      provider
    );

    Contract.getDwitters().then((Response) => {
      this.Dwitters = Response;

    });

    let ContractFee = new ethers.Contract(Config.addressContractFeeDwitterManagment, feeDwitterManagment.abi, provider);
    ContractFee.getFee().then(Response => { this.fee = Response / 1000000000000000000 });

    let provider2 = new ethers.providers.Web3Provider(window.ethereum);
    let signer2 = provider.getSigner();
    provider2.getNetwork().then((ris) => {

      console.log(ris.chainId);
      console.log(this.chainPolygon);
      if (ris.chainId === this.chainPolygon) { this.chainIdOk = true; } else { this.chainIdOk = false; }
    });
  },
  methods: {

    showHideModal(shoHide) { this.modalshow = shoHide; },
    trasferimentoFondi() {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.Contract = new ethers.Contract(
        Config.addressContractDwitter,
        Dwitter.abi,
        this.signer
      );
      let ContractWithSigner = this.Contract.connect(this.signer);
      ContractWithSigner.withdrawDwitter().then(alert("trasferimento avvenuto")).catch(console.error);


    },
    writeDwitter() {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((response) => {
          //const OwnerSigned = ContractOwner.connect(signer);
          this.provider = new ethers.providers.Web3Provider(window.ethereum);
          this.signer = this.provider.getSigner();
          this.Contract = new ethers.Contract(
            Config.addressContractDwitter,
            Dwitter.abi,
            this.signer
          );
          let ContractWithSigner = this.Contract.connect(this.signer);

          ContractWithSigner.setNewDwitter(this.testo, {
            value: ethers.utils.parseEther("" + this.fee),
          })
            .then((Response) => {
              this.messaggioModal = "Wait confirm transaction, Can you see status with this transaction hash:" + Response.hash;
              this.modalshow = true;
              this.provider.waitForTransaction(Response.hash).then(() => {
                this.Contract.getDwitters().then((Response) => {
                  this.Dwitters = Response;

                });

                this.modalshow = false;
              });
              this.testo = "";
            })
            .catch((error) => {
              console.error;
              alert(error.message);
            });
          
        });
      //console.log(receipt);
      //  Contract.getAllDwitter().then(Response =>{this.listaDwitter= Response});
    },
    bottonSwitch() {
      //window.ethereum.SwitchEthereumChainParameter({chainId:'https://polygon-rpc.com'})
 window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((response) => {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.chainId }]
      })
        .then((response) => { })
        .catch(() => {
         // alert('alert Add Wallet Polygon');
          window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: this.chainId,
                chainName: this.chainName,
                rpcUrls: [this.rpcUrls],
                nativeCurrency: {
                  name: "Matic",
                  symbol: "Matic",
                  decimals: 18,
                },
                blockExplorerUrls: [this.blockExplorerUrls],
              },
            ],
          });
        })
        })
    },
  },
};

try {

  window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
} catch { }
</script>



<style>
.btn {
  @apply py-1 px-2 rounded;
}

.btn-blue {
  @apply bg-teal-500 text-white border border-blue-500;
}
.btn-blue:hover {
  @apply bg-transparent text-teal-500;
}
</style>