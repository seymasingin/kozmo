import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite';

export default function Sepet({route}) {
  
  const[sepet,sepetSet]=useState([]);
  
  const db=SQLite.openDatabase('kozmo.db');

  useEffect(()=>{
    db.transaction(tx=>{
        tx.executeSql("CREATE TABLE IF NOT EXISTS sepet(id INTEGER PRIMARY KEY AUTOINCREMENT,isim TEXT,resim TEXT,fiyat FLOAT,urun_id TEXT,adet INTEGER)")
    });

    db.transaction(tx=>{
        tx.executeSql("SELECT * FROM sepet",null,(_,{rows})=>sepetSet(rows._array),(_,error)=>console.log(error))
    });



  },[])
  


  return (
    <ScrollView>
        <Text>{JSON.stringify(sepet)}</Text>
        {sepet.map((item,index)=>
        <View key={index} style={styles.sepetcard}>
        <View style={{padding:10}}><Image style={styles.sepetcardresim} source={{uri:item.resim}}/></View>
        <View><Text style={styles.sepetcardisim}>{item.isim}</Text></View>
        <View style={{padding:10}}>
            <View style={{flex:1,flexDirection:'row',paddingTop:20}}>
                <TouchableOpacity onPress={()=>arttir(item.id,adet)} ><Text style={styles.indi}>+</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>azalt(item.id,adet)} ><Text style={styles.indi}>-</Text></TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <Text>Adet</Text>
                <Text>{item.adet}</Text>
            </View>
        </View>
        <View style={{padding:10}}>
            <Text>Birim Fiyat</Text>
            <Text style={{marginBottom:10}}>{item.fiyat}</Text>
            <Text>Toplam Fiyat</Text>
            <Text>{item.fiyat*item.adet}</Text>
        </View>
    </View>
        
        )}
       
        
        


      
  
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    sepetcard:{
        flex:1,
        flexDirection:"row",
        backgroundColor:'white',
        marginTop:20,
        borderRadius:12
    },
    sepetcardresim:{
        width:80,
        height:80,
        
    },
    sepetcardisim:{
        width:130,
        fontSize:16,
        padding:10
    },
    indi:{
        fontSize:24,
        backgroundColor:'#ccc',
        marginRight:10,
        paddingHorizontal:4
    }
})