export default function HelloWorld(){
    const propsUserCard = {
        nama: "Daniel Anderson",
        nim: "2355301043",
        tanggal: "2025-03-13"
    }
    return(
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai />
            <QuoteText />

            <UserCard
            nama="Daniel Anderson Siphutar"
            nim="2355301043"
            tanggal={new Date().toLocaleDateString()}
            />

            <UserCard {...propsUserCard}/>

            <img src="img/logo-pcr.png" alt="logo"/>
        </div>
    )
}

function GreetingBinjai(){
    return (
        <small>Salam dari Binjai</small>
    )
}

function QuoteText() {
    const text = "Mulutmu Harimau mu";
    const text2 = "Aku ingin jadi macan";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserCard(props){
    return (
        <div>
            <hr />
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}
