<template>
     <form @submit.prevent> <!-- kogda nazali Submit=Add your post, to obnovlenija stranici ne hotim, ina4e post poterjaetjsa -->
        <h4>Write your post</h4>
        <my-input 
            v-model="post.title" 
            type="text" 
            placeholder="Name"/> <!--title=$event.target.value - prosluwivajet i zapisivajet zna4enie title takoe, kak vveli v pole  -->
        <my-input 
            v-model="post.body"
            type="text" 
            placeholder="Description"/>
        <br>
        <my-button @click="addPost">Add your post</my-button>
</form>
</template>

<script>
export default {
    data(){
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        addPost (){
            this.post.id=Date.now();
            this.$emit('add', this.post) // add=sobitije, kotoroe budet sluwat roditel i polu4at sebe massiv dannih iz this.post
            this.post={
                title: '', //posle dobavlenija posta input polja opustowajetsja
                body: ''
            }
        }
    }
}
</script>

<style>
form {
    display: flex;
    flex-direction: column;
}



</style>
