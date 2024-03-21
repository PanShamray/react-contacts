import "./App.css";
import React, { Component } from "react";

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {

      contacts: [],
      isActiveForm: false,

      newContact: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }

    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      newContact: {
        ...this.state.newContact,
        [name]: value,
      }
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, phoneNumber } = this.state.newContact;

    if (firstName && lastName && phoneNumber) {
      const newContacts = [...this.state.contacts, this.state.newContact];

      this.setState({
        contacts: newContacts,

        newContact: {
          firstName: "",
          lastName: "",
          phoneNumber: ""
        },

        isActiveForm: false

      })
    }

  };

  handleDelete = (index) => {
    const deletedContact = [...this.state.contacts];
    deletedContact.splice(index, 1);
    this.setState({ contacts: deletedContact });
  };

  showForm = () => {
    this.setState((prevState) => ({ isActiveForm: !prevState.isActiveForm }));
  };

  render() {
    return (
      
      <div>
        <h1>Контактна книга</h1>

        <table>
          
            <tr>
              <td>Ім'я</td>
              <td>Прізвище</td>
              <td>Номер телефону</td>
              <td>Опції</td>
            </tr>
          
          
            {this.state.contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phoneNumber}</td>
                <td>
                  <button onClick={() => this.handleDelete(index)}>
                    Видалити контакт
                  </button>
                </td>
              </tr>
            ))}
          
        </table>

        <button onClick={this.showForm}>Додати новий контакт</button>

        {this.state.isActiveForm && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="Ім'я"
              value={this.state.newContact.firstName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Прізвище"
              value={this.state.newContact.lastName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Телефон"
              value={this.state.newContact.phoneNumber}
              onChange={this.handleInputChange}
            />

            <button type="submit">Зберегти</button>
            <button onClick={this.showForm}>Скасувати</button>

          </form>
        )}

      </div>
    )
  }
}

export default Contacts;