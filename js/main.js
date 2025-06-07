const BaseUri = "https://playgroundapi-bgftdwfjbxdxg9au.northeurope-01.azurewebsites.net/api/PlayGrounds/";

//opretter en ny vue aplikation - app er en instans af vue, som kan monteres til en html-kode via app.mount('#app')
const app = Vue.createApp({
    //data returnere et objekt, der indeholder variabler, som vue-komponenten kan bruge. 
    //intro er en reaktiv variable, hvilket betyder, at hvis værdien ændres, opdateres det alle steder i brugergrænsefladen, hvor intro anvendes
    data() {
        return {
            intro: 'Play Grounds',
            playGroundsList: [],
            statusKode: "",

            name: "",
            maxChildren: 0,
            minAge: 0,

            isEditing: false,
            edithId: null,
            edithName: "",
            edithMaxChildren: null,
            edithMinAge: null,
        }
    },
    //en tom metode som kan fyldes med funktionalitet, metoden kan kaldes fra en html ved v-on eller @-direktivet: - fx. <button @click="myMethod">Klik her</button>
    methods: {
        getAll() {
            console.log("henter en liste af alle playgrounds")
            axios.get(BaseUri)
                .then(response => {
                    this.statuskode = response.status;
                    this.playGroundsList = response.data;
                    console.log("data modtaget", this.playGroundsList);
                })
                .catch(error => {
                    console.error("Fejl ved hentning:", error);
                    this.playGroundsList = [];
                    // Hvis backend svarer med 500/404 kan du f.eks. sætte:
                    this.statuskode = error.response?.status || "Ukendt fejl";
                })



        },
        addPlg() {
            console.log("tilføj en playground")
            axios.post(BaseUri, {
                name: this.name,
                maxChildren: this.maxChildren,
                minAge: this.minAge,
            })
            .then(response =>{
                console.log(response)
                this.statuskode = response.status
                    // Efter succes: hent listen på ny og nulstil felter
                    this.getAll();
                    this.name = "";
                    this.maxChildren = null;
                    this.minAge = null;
                })
                .catch(error => {
                    console.log(error)
                    this.statuskode = error.response?.status || "Ukendt fejl"
                })

        },
        showUpdate(plg){
            this.isEditing = true;
            this.edithId = plg.id;
            
            //til at udfylde felter 
            this.edithName = plg.name;
            this.edithMaxChildren = plg.maxChildren;
            this.edithMinAge = plg.minAge;
        },

        submitEdit() {
            const updatedPlg = {
                name: this.edithName,
                maxChildren: this.edithMaxChildren,
                minAge: this.edithMinAge,
            };
            axios.put(BaseUri + this.edithId, updatedPlg)
                .then((response) => {
                    this.statuskode = response.status;
                    this.getAll();
                })
                .catch((error) => {
                    this.statuskode = error.response?.status || "Ukendt fejl";
                });
        },
    },
    //beregner egenskaber 
    //bruges til at oprette dynamiske værdier baseret på andre data 
    //beregnede egenskaber er reaktive og opdateres automatisk - Hvis intro = "Hello Vue", vil reversedIntro returnere "euV olleH".
    computed: {
        myComputed() {
            return ''
        },
    },
    mounted() {
        this.getAll()
    }

})