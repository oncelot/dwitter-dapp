<template>
    <div >
       <b> Hi Welcome Microblog decentralized, here can you write into blockchain polygon </b><br>
<p>Everyone can use the contract and create personal dapp for read or write message.</p>
<p>
The contract use mainnet Polygon.<br>
Address contract is: {{ContractDwitter}}
</p>
<b>Write:</b> use setNewDwitter(string input), in the transaction add fee value, otherwise not accept message.<br>
<b>Read:</b>use  getDwitters return list all message<br>
<b>Read Specific Message: </b>getDwitterId(int id)<br>
<b>Read your message:</b> use myDwitter(string address)<br>


</div>
</template>
<script>
 import Config from "../stores/config.js";

export default ({
  data(){return {
    ContractDwitter:'',  
  }},
  mounted(){
     this.ContractDwitter=Config.addressContractDwitter;
  }
})
</script>
