<template>
   <div v-if="posts.length >0"> <!-- esli est hotja bi 1 post, to pokazi ego -->
       <h3>List of posts</h3>
       <transition-group name="post-list"> <!-- animacija dlja postov -->
        <post-item 
            v-for="post in posts" 
            v-bind:post = "post"
            v-bind:key="post.id"
            @remove="$emit('remove', post)"
        />
        </transition-group>
    </div>
    <h2 v-else style="color: gold"> <!-- v protivnom slu4ae vidaj eto. Dlja infi: esli nado neskolko if, to est v-else-if... ewe v-else-if...i togda v konce v-else  -->
        List of posts is empty
    </h2>
</template>

<script>
import PostItem from '@/components/PostItem'
export default {
    components: {
        PostItem
    },
    props: { // iz PostForm peredalis vvedennoe soobwenije v App.vue, a on 4erez props perekinul ih v PostList
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.post-list-item { /* na4alo takoe ze kak i u name v transition-group v HTML */
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active, /* 4ast animacii, vzjato s saita dokumentacii vue3, konec imenno takoi, kak propisano v dokumentacii*/ 
.post-list-leave-active {
    transition: all 0.4s ease;
}
.post-list-enter-from, /* animacija na dobavlenije/udalenije posta, konec imenno takoi, kak propisano v dokumentacii*/ 
.post-list-leave-to {
    opacity: 0;
    transform: translateX(150px) ;
}
.post-list-move { /* animacija dlja sortirovki, vzjata s vue3 dokumentacii, konec imenno takoi, kak propisano v dokumentacii*/ 
    transition: transform 0.8s ease;
}
</style>
