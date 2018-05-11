import React, { Component } from 'react'
import { TextInput } from 'react-native'
import axios from 'axios'
import { Text, Container, Picker, List, ListItem, Content } from 'native-base'


export default class ManualEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            nutrition: [],
            foodType: 'Common Foods'
        }
        this.onSubmitFood = this.onSubmitFood.bind(this)
      }

      onSubmitFood() {
                let result = axios.get(
                    `https://nutri-yum.herokuapp.com/api/nutri/search/${
                        encodeURI(this.state.text)
                    }`
                )
                .then((result) => {
                    this.setState({
                        nutrition:result.data
                    })
                })
                .catch((error) => {
                    console.error(error)
                    return <Text>{error.message}</Text>
                })

        this.setState({ text: '' })
      }

    render () {
        return (
            <Container style={styles.container}>
                <Text>What did you put in your face hole?</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder={'ENTER FOOD HERE'}
                    onSubmitEditing={this.onSubmitFood}
                    name='food'
                    />
                    <Container>
                    <Content>
                    {
                        this.state.nutrition.map((food, index) => {
                            return (
                            <List key={index}>
                              <ListItem itemDivider><Text>name:  {food.name}</Text></ListItem>
                              <ListItem><Text>sugar:  {food.sugar}</Text></ListItem>
                              <ListItem><Text>calories:  {food.calories}</Text></ListItem>
                              <ListItem><Text>total fat:  {food.totalFat}</Text></ListItem>
                              <ListItem><Text>carbs:  {food.carbs}</Text></ListItem>
                           </List>
                            )
                        })
                    }
                </Content>
                </Container>
            </Container>
        )
    }
}

const styles = {
    container: {
        margin: 20,
        marginTop: 50
    }
}