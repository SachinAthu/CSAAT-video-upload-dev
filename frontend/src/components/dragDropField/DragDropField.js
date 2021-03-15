import React, { Component } from 'react'

import styles from './DragDropField.module.css'

class DragDropField extends Component {

    constructor(props){
        super(props)
        this.state = {
            dragging: false,
        }
        this.dropRef = React.createRef()
        this.dragCounter = 0  
    }

    componentDidMount(){
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
        this.dragCounter = 0

    }

    componentWillUnmount(){
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    handleDragIn = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++  
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          this.setState({dragging: true})
        }
      };
    
      handleDragOut = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--
        if (this.dragCounter > 0) return  
        this.setState({dragging: false})
      };
    
      handleDrag = e => {
        e.preventDefault();
        e.stopPropagation();
      };
    
      handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        console.log(e.dataTransfer.files)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.setState({
            dragging: false,
          });
          this.props.onChange(e.dataTransfer.files[0])
          e.dataTransfer.clearData()
          this.dragCounter = 0
        }
      };

      onChange = e => {
        this.props.onChange(e.target.files[0])
      }

    render() {
        const {dragging} = this.state
        const {filename} = this.props

        return (
            <div className={dragging ? `${styles.dropbox} ${styles.dropbox_dragging}` : styles.dropbox} 
            ref={this.dropRef}>
                <label htmlFor="profile_add_form_cdoc">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28">
                    <path d="M20 13.5c0-0.125-0.047-0.266-0.141-0.359l-5.5-5.5c-0.094-0.094-0.219-0.141-0.359-0.141-0.125 0-0.266 0.047-0.359 0.141l-5.484 5.484c-0.094 0.109-0.156 0.234-0.156 0.375 0 0.281 0.219 0.5 0.5 0.5h3.5v5.5c0 0.266 0.234 0.5 0.5 0.5h3c0.266 0 0.5-0.234 0.5-0.5v-5.5h3.5c0.281 0 0.5-0.234 0.5-0.5zM30 18c0 3.313-2.688 6-6 6h-17c-3.859 0-7-3.141-7-7 0-2.719 1.578-5.187 4.031-6.328-0.016-0.234-0.031-0.453-0.031-0.672 0-4.422 3.578-8 8-8 3.25 0 6.172 1.969 7.406 4.969 0.719-0.625 1.641-0.969 2.594-0.969 2.203 0 4 1.797 4 4 0 0.766-0.219 1.516-0.641 2.156 2.719 0.641 4.641 3.063 4.641 5.844z"></path>
                  </svg>
                </label>

                <input
                  type="file"
                  name="consent_doc"
                  id="profile_add_form_cdoc"
                  onChange={this.onChange}
                  className={styles.filefield}
                />

                {filename ? <span>{filename}</span> : null} 
            </div>
        )
    }
}

export default DragDropField
