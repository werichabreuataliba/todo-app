import React, { Component } from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { add, changeDescription, search, clear } from './todoActions'

class TodoForm extends Component {
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }
    
    //Chamada do midlleware que vai gerenciar o then que retorna do promisse la na Action que esta usando
    //axios(get)
    componentWillMount(){
        this.props.search()
    }
    
    keyHandler(e){
        
        const { add, search, description, clear } = this.props //extraindo métopdo/propriedades vinculados ao props
        
        if( e.key == 'Enter'){            
            e.shiftKey ? search() : add(description)
        }
        else if(e.key == 'Escape'){
            clear()
        }
    }
    
    render() {
        const { add, search, description } = this.props //extraindo métopdo vinculados ao props, não extrai o clear pq nao tem parametros pra ele
        
        return(
            <div role='form' className='todoForm'>
        <Grid cols='12 9 10'>
            <input id='description' className='form-control'
                placeholder='Adcione uma tarefa'
                onChange={this.props.changeDescription}
                value={this.props.description}
                onKeyUp={this.keyHandler}>
            </input>
        </Grid>
        
        <Grid cols='12 3 2'>
            <IconButton style='primary' icon='plus' 
                onClick={()=> add(description)}></IconButton>            
            
            <IconButton style='info' icon='search'
                onClick={search}></IconButton>
            
            <IconButton style='default' icon='close'
                onClick={this.props.clear}></IconButton>
        </Grid>
    </div>
        )
    }
}
    
const mapStateToProps = state => ({ description : state.todo.description })
const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search, add, clear }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)