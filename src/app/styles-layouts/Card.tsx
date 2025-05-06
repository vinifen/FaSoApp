import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Card() {
  return (
    <View style={{padding: 10, backgroundColor: "lightgray", flexDirection: "row"}}>
      
      <Image source={require('../../../assets/images/image.png')} style={{ width: 100, height: 100 }} />
      <View style={{marginLeft: 20, justifyContent: "center", flex: 1}}>
        <Text style={{fontWeight: "bold", fontSize: 15}}>Sophiala</Text>
        <Text style={{fontSize: 12, color: "#6D6D6D"}}>@bestieee</Text>
        <View style={{marginTop: 10}}>
          <View style={{backgroundColor: "red", width: "100%", height: 6, marginBottom: 10}}></View>
          <View style={{ flexDirection: "row"}}>
            <View style={{backgroundColor: "blue", width: "70%", height: 6}}></View>
            <View style={{backgroundColor: "#A4A4A4", width: "30%", height: 6}}></View>
          </View>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
          <Text style={{color: "#6D6D6D"}}>Level 12</Text>
          <Text style={{color: "#6D6D6D"}}>Leader</Text>
        </View>
      </View>
    </View>
  )
}