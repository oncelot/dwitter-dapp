<template>
    <div  class="sm:container sm:mx-auto" style="max-width: 650px">mydwitter
 <ClistDwitter :Dwitters="myDwitter"/>    
    </div>
    
</template>
<script>
import makeBlockie from "ethereum-blockies-base64";
import Dwitter from "../contracts/Dwitter.json";
import Config from "../stores/config.js";
import { ethers } from "ethers";
import ClistDwitter from '../components/listDwitter.vue'

let provider;
let Contract;

export default {
   components:{ClistDwitter},

data(){return{ myDwitter:[],myaddress:''}},
mounted(){
  this.myaddress= Config.addressConnectionglobal;
  this.provider = new ethers.getDefaultProvider(Config.irpDefault);
  this.Contract = new ethers.Contract(Config.addressContractDwitter, Dwitter.abi,this.provider);
  this.Contract.myDwitter(this.myaddress).then((Response) => {
   // this.myDwitter = Response;
    Response.map((item) => {
      this.Contract.getDwitterId(parseInt(item, 16)).then((Response) => {
        var data = new Date(Response[2] * 1000);
      console.log(data);
        this.myDwitter.push ({
          image: makeBlockie(Response[1]),
          owner: Response[1],
          timestamp:data,
            text: Response[0],
            });
            });
            });
      console.log(this.myDwitter);
    });



},
 methods: {
    ListaDwitterCalculate() {
      return this.myDwitter.map((item) => {
        return {
            image: makeBlockie(item.owner),
          owner: item.owner,
          datatime:item.datatime,
          text: item.text,
        }

        
      });
    },}
}
</script>
