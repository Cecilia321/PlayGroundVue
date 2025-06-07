//opretter en ny vue aplikation - app er en instans af vue, som kan monteres til en html-kode via app.mount('#app')
const app = Vue.createApp({
    //data returnere et objekt, der indeholder variabler, som vue-komponenten kan bruge. 
    //intro er en reaktiv variable, hvilket betyder, at hvis værdien ændres, opdateres det alle steder i brugergrænsefladen, hvor intro anvendes
    data() { 
        return { intro: 'Welcome to my Vue template', 

        } 
    }, 
    //en tom metode som kan fyldes med funktionalitet, metoden kan kaldes fra en html ved v-on eller @-direktivet: - fx. <button @click="myMethod">Klik her</button>
    methods: { 
        myMethod(){

        }, 
    }, 
    //beregner egenskaber 
    //bruges til at oprette dynamiske værdier baseret på andre data 
    //beregnede egenskaber er reaktive og opdateres automatisk - Hvis intro = "Hello Vue", vil reversedIntro returnere "euV olleH".
    computed: { 
        myComputed() {
         return '' 
        }, 
    } 
})