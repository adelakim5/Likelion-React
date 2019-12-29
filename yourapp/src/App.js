import React, { Component } from 'react';
import './App.css';
import api from './api';
// Material-ui
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
// card
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
//textfield
import TextField from '@material-ui/core/TextField'


export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      results:[],
    } 
  }

  componentDidMount(){
    this.getPosts()
  }

  async getPosts(){
    let _result = await api.getAllPosts()
    this.setState({
      results: _result.data
    })
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    await api.createPost({
      title: this.state.title,
      content: this.state.content,
    })
    this.setState({
      title:'',
      content:'',
    })
    this.getPosts()
  }

  handleDelete = async id => {
    await api.deletePost(id)
    this.getPosts()
  }

  render(){
    return (
    <div className="App">
      <Container maxWidth="md">
      <Paper className="PostingSection" variant="elevation" elevation={2}>
        <form className="" onSubmit={this.handleSubmit} className="PostingForm">
        <TextField className="Field" id="outlined-basic" label="Title" variant="outlined" name="title" onChange={this.handleChange} value={this.state.title}/>
       
          <TextField className="Field"
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows="4"
          variant="outlined"
          name="content"
          onChange={this.handleChange}
          value={this.state.content}
        />
        
        <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
      >
        Save
      </Button>

        </form>
      </Paper>
      <div className="ViewSection" >
        {this.state.results.map(post => (
      <Card className="card" key={post.id}>
        <CardContent>
          <Typography  color="textSecondary" gutterBottom>
            {post.id}
          </Typography>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" component="p">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={event => this.handleDelete(post.id)} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
        </CardActions>
      </Card>

        ))}
        </div>
        </Container>
    </div>
    )
  }
};

