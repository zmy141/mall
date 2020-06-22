<template>
    <div class="check-button" :class='{check:ischecked}'>
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
    name:'checkButton',
    props:{
        ischecked:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style>
    .check-button{   
        border-radius: 50%;
        border: 2px solid #aaa;
    }
    .check{
        background-color:var(--color-tint);
        border:2px solid var(--color-tint) ;
    }
</style>