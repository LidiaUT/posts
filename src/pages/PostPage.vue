<template>
<div>
    <h1>Forum page</h1>
    <my-input 
        v-model="searchQuery"
        placeholder="Search by title..."
    /> <!-- dlja poiska; v-model dlja dvustoronnego svjazivanija -->
    <div class="app_btns">
        <my-button @click="showDialog">Create post</my-button>
        <my-select v-model="selectedSort" v-bind:options="sortOptions" /> <!-- knopka dlja vibora sortirovki -->
    </div>
<!--    <my-button @click="fetchPosts">Get previous posts</my-button> povewen sluwatel sobitija @click i esli nazato, to vizivahem funkciju fetchPost v postami s servera; esli knopka ne nazata, to nikakih postov po umol4aniju ne vidno -->
<!--    <input type="text" v-model.trim="modificatorValue">  trim otrezajet probeli -->
    <my-dialog v-model:show="dialogVisible"> <!-- okno dlja vnosa posta-->
        <post-formVue
        @add="addPost" 
        /> <!-- vivodim etot komponent v nawem wablone;esli proizowlo u rebenka sobitie add, to vizivajem addPost funkciju-->
    </my-dialog>
   <post-list 
    v-bind:posts="sortedAndSearchedPosts"
    @remove="removePost"
    v-if="!isPostsLoading" 
    />  <!-- posti otrazajutsja, esli isPostsLoading true -->
    <div v-else>Data is loading...</div> <!-- esli isPostsLoading false, to Data is loading -->
    <div ref="observer" class="observer"></div> <!-- dolistal li 4el do konca, i nado li podgruzat novije zapisi -->
    <!-- 4tobi vnizu bila numeracija stranic, esli posti na 1 stranicu ne pomewajutsja 
        <div class="page_wrapper"> div: 4tobi pojavilsja obzor koli4estva stranic, esli posti na 1 stranicu ne pomewajutsja; pageNumber = tekuwij #stranici
        <div v-for="pageNumber in totalPages"  
        v-bind:key="pageNumber"
        class="page" 
        v-bind:class="{'current-page': page === pageNumber}"
        @click="changePage(pageNumber)">  
        4tobi #tekuwej stranici bil oformlen po-drugomu (current-page); changePage - dinami4eskaja smena #stranici 
        {{ pageNumber }}
        </div> 
        </div> -->

    
</div>
</template>

<script>
import PostFormVue from '@/components/PostForm' //@=alias ozna4ajet papku src; mozno zapisat i ./components
import PostList from '@/components/PostList' //ukazivajem imja kak importirujem etot komponent
import MyDialog from './components/UI/MyDialog'
import MyButton from './components/UI/MyButton'
import MySelect from './components/UI/MySelect'
import axios from 'axios'

export default{
    components: {
        PostList, PostFormVue,
        MyDialog, MySelect,
        MyButton //registrirujem komponent, kotorij hotim videt v wablone
    },
  data(){
      return {
        posts: [], // iz fetchPost polu4ennije dannie s servera vozvrawajutsja kak massiv, ili v ru4nuju kazduju stro4ku togo, 4to nado vernut
        dialogVisible: false, 
        // modificatorValue: ''
        isPostsLoading: false, // 4tobi user znal, 4to idet zagruzka dannih s servera, esli dolgo dannije ne pokazivajutsja
        selectedSort: '',
        searchQuery: '', //model dlja poiska
        page: 1, // model, v kotoroj budem hranit nomer stranici, po umol4anije postavim pervuju =1
        limit: 10, // ograni4im koli4estvo postov na 1 stranice
        totalPage: 0, //F12-Network-posts...-Headers - x-total-count: pokazet skolko max zapisej zdes est
        sortOptions:[
            {value: 'title', name: 'By name'},
            {value: 'body', name: 'By content'}
        ]
      }
  },
  methods: {
      addPost(post){
          this.posts.push(post);
          this.dialogVisible=false; // posle dobavlenija posta, okno spra4etsja
      },
      removePost(post) {
          this.posts = this.posts.filter (p => p.id !== post.id) //array.filter(...) to remove unwanted items from an array, the original array doesn't change and creates a new one. 
      },
      showDialog(){
          this.dialogVisible=true;
      },
      /*changePage(pageNumber) { // budet ...?
          this.page = pageNumber;
          this.fetchPosts(); //v zavisimosti ot nazatogo #stranici podgruzajutsja posti
      }, */
      // vnizu numeracija stranic
      async fetchPosts(){ // dlja polu4enija spiska postov s servera, demo ograni4eno 5 postami https://jsonplaceholder.typicode.com/posts?_limit=5, nuzno ustanovit axios: npm i axios
        try { // dlja otlavlivanija owibok; async vsegda rabotajet vmeste s avait
            this.isPostsLoading = true;
                // const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"); // zapros na server, otvet v peremennoj response, do togo, kak bili sozdani model page i limit v data-return
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", { //konec url berem iz dara-return modeli
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }                    
                });
                this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit); //4tobi znat skolko vsega stranic budet, x-total iz F12-Networks-posts..-x-total-count; this.limit v data-return ustanovili, 4to na 1 str=10postov; ceil = okruglenije do celogo 4isla
                this.posts = response.data; // v model post pomewen otvet s servera, imenno s polja data
        } catch (error) {
            alert ('Ups! Something went wrong!')  
        } finally {
            this.isPostsLoading = false;
        }
      },
      // podgrazajet novie posti, kogda dokrutili do niza
        async loadMorePosts (){ // dlja polu4enija spiska postov s servera, demo ograni4eno 5 postami https://jsonplaceholder.typicode.com/posts?_limit=5, nuzno ustanovit axios: npm i axios
        try { // dlja otlavlivanija owibok; async vsegda rabotajet vmeste s avait
            this.page += 1;
           
                // const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"); // zapros na server, otvet v peremennoj response, do togo, kak bili sozdani model page i limit v data-return
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", { //konec url berem iz dara-return modeli
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }                    
                });
                this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit); //4tobi znat skolko vsega stranic budet, x-total iz F12-Networks-posts..-x-total-count; this.limit v data-return ustanovili, 4to na 1 str=10postov; ceil = okruglenije do celogo 4isla
                this.posts = [...this.posts, ...response.data]; //v massive est uze posti, dobavlajem novie, 4to polu4ili s servera
        } catch (error) {
            alert ('Ups! Something went wrong!')  
        }
      }
    },
    mounted(){ // 4tobi posti podgruzilis srazu pri oktritii stranici
        this.fetchPosts();  
        console.log(this.$refs.observer);
        const options = { // Observer API
            rootMargin: '0px',
            threshold: 1.0
        } 
        const callback = (entries) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) { // proverka: esli nomer stranici menwe obwego kol-va stranic, to podgruzajem sledujuwij blok postov
            this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts(){ //mutirujet novij massiv?, vozvrawajet otsortirovannij massiv
            return [...this.posts].sort((post1, post2) =>
            post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter (post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase())) // poisk po nazvaniju posta,toLowerCase - ina4e bolwije/malenkije bukvi budut imet zna4enije
        }
    },
    watch:{ 
        /*selectedSort(newValue) { //v watch mutirujet ishodnij massiv, selectedSort imja to4no takoe ze kak v data-return ukazana
        this.posts.sort((post1, post2) => {
            return post1[newValue]?.localeCompare(post2[newValue])
        })
        }*/
    }
 }
</script>

<style >


.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;

}
.page_wrapper {
    display: flex; /* 4tobi cifri stranic bili rjadom drug s drugom*/ 
    margin-top: 15px;
}
.page {
    border: 1px dashed blue;
    padding: 10px; /* vnutrennije otstupi v kvadratikas s #stranic*/
}
.current-page {
    border: 2px solid greenyellow;
    background-color: indigo;
}
.observer {
    height: 30px;
    background: gray;
}
</style>