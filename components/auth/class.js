class UebungenAnzeigen extends React.Component {
  state = {
    data: [
      {
        name: "Herabschauender Hund",
        kategorie: "anfaenger",
        erklaerung:
          "Steißbein zur Decke | Rücken gerade | Kopf in Verlängerung der Wirbelsäule",
        photo: require("./fotosAsanas/Herabschauender_Hund.png"),
        dauer: 30,
      },

      {
        name: "Katze",
        kategorie: "geuebt",
        erklaerung:
          "Steißbein zur Decke | Rücken gerade | Kopf in Verlängerung der Wirbelsäule",
        photo: require("./fotosAsanas/Katze.png"),
        dauer: 20,
      },
      {
        name: "Kuh",
        kategorie: "eingeschraenkt",
        erklaerung:
          "Steißbein zur Decke | Rücken gerade | Kopf in Verlängerung der Wirbelsäule",
        photo: require("./fotosAsanas/Kuh.png"),
        dauer: 20,
      },
    ],
  };

  render() {
    return (
      <View>
        <Button
          title="Auswahl"
          onPress={() =>
            this.props.navigation.navigate("PlanBeenden", { data: data })
          }
        />
      </View>
    );
  }
}

// the class that should receive the data
//What do I have to put in to receive the data of UebungAnzeigen?

class PlanBeenden extends React.Component {
  render() {
    let data = this.props.route.params?.data; //How to do this correctly for state of UebungAnzeigen?
    console.log(data);
    return (
      <View>
        <Button
          style={stylesButtons.button}
          title="Go back"
          onPress={() => this.props.navigation.navigate("Auswahl")}
        />
      </View>
    );
  }
}
