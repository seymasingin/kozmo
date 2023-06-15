import { StyleSheet, Text, View,Image, TouchableOpacity,TextInput,Button,SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import * as SQLite from 'expo-sqlite';


export default function Urun({route,navigation}) {
  const[adet,adetSet]=useState(1)
  const {item}=route.params;
  
  const arttir=()=>{
    if(adet===9){
      Alert.alert("Stok Sınırı","Maksimum 9 Adet Alabilirsiniz")
    }else{
      adetSet(adet+1)
    }
    
  }

  const azalt=()=>{
    if(adet!==1){
      adetSet(adet-1)
    }
    
  }

  const sepeteEkle=(item,adet)=>{
    const db=SQLite.openDatabase('kozmo.db');
    db.transaction(tx=>{
      tx.executeSql("INSERT INTO sepet (isim,resim,fiyat,urun_id,adet) VALUES(?,?,?,?,?)",[item.name,item.image_link,item.price,item.id,Number(adet)],
      ()=>navigation.navigate('Sepet'),(_,error)=>console.log(error)
      )
    });
    

  }
  
  return (
    <SafeAreaView>
      <ScrollView>
      <Text style={styles.urunbaslik}>{item.name}</Text>
      <Image style={styles.urunresim} source={{uri:item.image_link}} />
      <Text style={styles.urunmarka}>{item.brand}</Text>
      <Text style={styles.urunfiyat}>{item.price}$</Text>
      <View style={styles.urunview}>
        <Text style={styles.urunadet}>{adet}</Text>
        <TouchableOpacity style={styles.adetindi} onPress={arttir}><Text style={styles.adeticon}>+</Text></TouchableOpacity>
        <TouchableOpacity style={styles.adetindi} onPress={azalt}><Text style={styles.adeticon}>-</Text></TouchableOpacity>
      </View>
      <Button style={styles.sepeteekle} onPress={()=>sepeteEkle(item,adet)}  title="Sepete Ekle" color='darkblue'/>
      <View style={styles.space20}></View>
      <Button style={styles.hemenal} title="Hemen Al" onPress={()=>navigation.navigate('Sepet')} color="deeppink" />
      <View style={styles.space20}></View>
      <Button style={styles.whatsapp} title="Whatsapp Sipariş" color='forestgreen'/>
      <View style={styles.space20}></View>
      <View style={{backgroundColor:"ivory",padding:10}}>
          <Text style={styles.urunbaslik}>Ürün Açıklama</Text>
          <Text style={styles.urunaciklama}>{item.description}</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  urunbaslik:{
    fontSize:21,
    color:'#050505',
    textAlign:'center',
    marginTop:20
  },
  urunresim:{
    width:'100%',
    height:350,
    marginTop:20

  },
  urunmarka:{
    color:"#050505",
    marginTop:10,
    fontSize:16
  },
  urunfiyat:{
    color:'deeppink',
    fontSize:24
  },
  urunview:{
    flex:1,
    flexDirection:'row',
    marginTop:20,
    marginBottom:20
  },
  adetindi:{
    marginRight:10,
  },
  adeticon:{
    backgroundColor:'#ccc',
    fontSize:24,
    width:40,
    paddingLeft:10,
    paddingRight:10
  },
  urunadet:{
    borderWidth:1,
    borderColor:'#ccc',
    fontSize:14,
    width:50,
    marginRight:20,
  },
  space20:{
    marginBottom:20
  }
  

})