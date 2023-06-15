import { StyleSheet, Text, View,Image,TextInput,ScrollView, TouchableOpacity,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Home({navigation}) {

  const[veri,veriSet]=useState([])
  const[sorgu,sorguSet]=useState("")
  
  useEffect(()=>{
    axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
    .then(response=>veriSet(response.data))
    .catch((error)=>{console.log(error)})
  },[]);

  const filtre=veri.filter(product=>
    product.name.toLowerCase().includes(sorgu.toLowerCase())
  );

  const Kart=({item})=>{
    return(
        <TouchableOpacity style={styles.uruncard} onPress={()=>navigation.navigate('Urun',{item:item})}>
            <Image style={styles.uruncardresim} source={{uri:item.image_link}}/>
            <Text style={styles.uruncardisim}>{item.name}</Text>
            <Text style={styles.uruncardfiyat}>{item.price}$</Text>

        </TouchableOpacity>
    )

  }

  return (
    <View style={styles.homecontainer}>
    <Image style={styles.logo} source={require('../assets/indir.png')} />

        
            <TextInput style={styles.arainput} value={sorgu} onChangeText={(e)=>sorguSet(e)} placeholder="Ürün,Marka,Kategori Ara..."/>
            
            <View style={styles.ustkategori}>
                <Text style={{marginTop:20,marginBottom:20}}>#Kategoriler  #Markalar  #Popüler</Text>
            </View>

            
                
           
            <FlatList data={filtre} renderItem={Kart} keyExtractor={(item)=>item.id.toString()} />

            <Image style={styles.banner} source={require('../assets/maybelline-banner.jpg')}/>
                <Image style={styles.banner} source={require('../assets/loreal-banner.png')}/>
                <Image style={styles.banner} source={require('../assets/dior-banner.jpg')}/>
        
           



        
      
    </View>
  )
}

const styles = StyleSheet.create({
    homecontainer:{
        
        paddingTop:50,
        alignItems:'center',
        

    },

    ustkategori:{
        alignItems:'center'

    },
    logo:{
        width:300,
        height:60,
        
    },
    arainput:{
        borderWidth:2,
        borderColor:'darkblue',
        borderRadius:6,
        width:'100%',
        marginTop:20,
        paddingLeft:15,
        color:'blue',

    },
    banner:{
        width:'100%',
        height:150,
        marginBottom:10
    },
    uruncardresim:{
        width:'100%',
        height:300,
    },
    uruncard:{
        padding:20,
        backgroundColor:'white',
        margin:10,
        marginBottom:20,
        borderRadius:12,
    },
    uruncardisim:{
        alignSelf:'center',
        fontSize:21,
        marginTop:15,
        color:'darkblue'

    },
    uruncardfiyat:{
        paddingLeft:20,
        fontSize:24,
        color:'deeppink',
        fontWeight:'bold',
    }
})