import { StyleSheet, Dimensions } from "react-native";
 const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  bookingtitle:{fontSize:30,color:'#000'},
    reviewContent: {
        paddingTop: 10,
      },
      avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
      },
      reviewListHead: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 5,
      },
      reviewContainer: {
        marginTop: 20,
        paddingBottom: 10,
      },

      rating: {
        paddingTop: 20,
      },
      reviewsList: {
        paddingTop: 0,
      },
      buttonaddr:{display:'flex',position:'absolute',right:0,marginTop:20,flexDirection:'row',backgroundColor:'#61ad7f',paddingTop:18,paddingRight:25,paddingLeft:35,paddingBottom:18,borderRadius:50,shadowColor: "#000",justifyContent:'flex-end',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,},
      ratingList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      ratingBox: {
        paddingLeft: 10,
        paddingTop: 0,
        paddingBottom: 0,
      },
      review: {

        paddingTop: 0,

      },
      reviewHead: {
        padding: 10,
      },
      title: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: 20,
      },
      categoryTitle: {
        color: "#fff",
        fontSize: 18,
        paddingLeft: 20,
        position:'absolute',
        bottom:20,
        zIndex:9999
      },
      location: {

        paddingTop: 20,
        fontSize: 20,
        color: "#000",
        height: 100,
      },
      content: {
        padding: 20,
      },
      image: {
        height: 300,
        paddingLeft:0,
        paddingRight:0,
        resizeMode: 'cover',   
        flexDirection: 'row',

             },
    viewsli:{marginRight:-50},
   
    screenitem:{
       display:'flex', 
       flexDirection: 'row',
     },


      heading: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#282828",
      },
      services: {
        marginTop: 30,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "bold",
        color: "#282828",
      },
      bkheading:{marginTop:20,fontSize:17,color:'#aaa'},
          blacktxt:{marginTop:20,fontSize:17,color:'#000'},
      bkdesc:{marginTop:20,fontSize:17,color:'#aaa'},
      bkdescdate:{marginTop:20,fontSize:22,fontWeight:'bold',color:'#61ad7f'},
      fawbtn:{borderWidth:2,borderColor:'#ccc', position:'relative', borderRadius:5,padding:20,marginTop:25},
      details: {
        paddingTop: 10,
        fontSize: 16,
        lineHeight: 22,
        color: "#282828",
      },
      
      iconinbtn:{   left:8,   position:'absolute',top:10,},
    textinbtn:{fontSize:18,fontWeight:'bold',color:'#61ad7f',textTransform:'uppercase',textAlign:'center'},
      wrapper: {
        backgroundColor: "#fff",
        position:'relative'
      },
      HeaderContainer: {
        padding: 20,
        position:'absolute',
        paddingTop: 40,
        flexDirection: "row",
        zIndex:9999,
      },
      brief: {
        fontSize: 30,
        color: "#fff",
      },
      headerCategory: {
        flex: 1,
        flexDirection: "row",
      },
      close: {
        fontSize: 32,
        right:16,
        top:-3,
        color: "#fff",
      },
      checkboxList: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 20,
        flexWrap: "wrap",
      },
      input: {
        paddingTop: 10,
        paddingLeft: 10,
        padding: 0,
        height: 150,
        borderColor: "#a9a9a9",
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        textAlignVertical: "top",
        color: "#000",
      },
      bluedot:{backgroundColor:'#5c9b84',borderRadius:50,height:30,width:30,marginTop:5,},
      statusvi:{position:'absolute',top:-30,left:18,},
      buttons: { color: "#5c9b84", marginTop: 20, backgroundColor: "#5c9b84" },
      buttonstxt: { color: "#fff" },
      viewover:{position:'absolute',top:0,width:width, height:500},
borderbot:{borderRadius:10,position:'absolute',bottom:50, zIndex:9999, borderWidth:2,width:'96%',left:'2%',padding:20,borderColor:'#fff'},
    corb:{marginRight:-60},
viewposr:{display:'flex',flexDirection:'row',justifyContent:'space-between'},
taskco:{fontSize:26,color:'#fff'},
buttonbook:{ width:'100%',paddingTop:10,paddingRight:20,paddingLeft:12,paddingBottom:10,marginTop:20, backgroundColor:'#5c9b84',
     flex: 1,flexDirection: "row", alignItems:'center', justifyContent:'center',  },
     

  titlereviewbtn:{flex: 1,flexDirection: "row", alignItems:'center', justifyContent:'space-between',  paddingBottom:10}, 

   centeredView: {
    position:'absolute',
    height:'100%',
    bottom:0,
    width:'100%',
    backgroundColor:'rgba(0,0,0,.5)',
  },
  modalView: {
        position:'absolute',

    bottom:0,

        width:'100%',
    margin: 0,
    backgroundColor: "white",
    borderRadius: 0,
    paddingTop:10,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
 
});