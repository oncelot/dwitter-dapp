<template>
<div  class="sm:container sm:mx-auto" style="max-width: 650px"><ClistDwitter :Dwitters="Dwitter"/></div>
</template>

<script>
import { ethers } from "ethers";
import Dwitter from "../contracts/Dwitter.json";
import Config from "../stores/config.js";
import makeBlockie from "ethereum-blockies-base64";
import ClistDwitter from '../components/listDwitter.vue'


export default ({
  props: ['id'],
   components:{ClistDwitter},

  data(){return {
      testo:'', image:'', owner:'',Dwitter:[]
  }},
      mounted() {
    const provider = new ethers.getDefaultProvider(Config.irpDefault);
    let Contract = new ethers.Contract(
      Config.addressContractDwitter,
      Dwitter.abi,
      provider
    );

    Contract.getDwitterId(this.id).then((Response) => {
      var data = new Date(Response[2] * 1000);
      this.Dwitter=[{owner:Response[1],
      timestamp:data,
      text:Response[0]}
      ]
        this.owner= Response[1];
        this.image= makeBlockie(Response[1]);
        this.testo=Response[0];

       
    });
  },
})
</script>
