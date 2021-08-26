<template>
   <div class="post">
       <div>
            <div>{{post.id}}</div> <!-- 4tobi v na4ale kazdogo posta bil ego id-->
            <div><strong>Name: </strong>{{post.title}}</div>
            <div><em> Description: </em>{{post.body}}</div>
        </div> 

       <div class="post_btns">
           <my-button @click="$emit('remove', post)">Delete post</my-button>
       </div>

    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px dashed blue;
    margin-top: 15px;
    background-color: yellow;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>