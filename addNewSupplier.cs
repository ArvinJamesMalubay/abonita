using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace Sales_Order
{
    public partial class addNewSupplier : Form
    {
        private string connectionString;
        public addNewSupplier(string connectionString)
        {
            InitializeComponent();
            this.connectionString = connectionString;
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string name = txtsupplierName.Text;
            string phone = txtPhone.Text;
            string email = txtEmail.Text;
            string address = txtAddress.Text;
            string contact = txtContactPerson.Text;
            string payment = txtPayment.Text;
            bool status = isActive.Checked;
            string notes = txtNotes.Text;
            string city = txtCity.Text;
            string state = txtState.Text;
            string country = txtCountry.Text;
            string zipCode  = txtZipCode.Text;
           

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email))
            {
                MessageBox.Show("Name and Email are required fields.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "INSERT INTO suppliers (name, phone, address, contact_person,payment_terms, status, notes, city, state, zip_code, country) " +
                                   "VALUES (@name, @phone,@address, @contactPerson, @paymentTerms, @status, @notes, @city, @state, @zipCode, @country)";
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@name", name);
                        command.Parameters.AddWithValue("@phone", name);
                        command.Parameters.AddWithValue("@address", address);
                        command.Parameters.AddWithValue("@contactPerson", contact);
                        command.Parameters.AddWithValue("@paymentTerms", payment);
                        command.Parameters.AddWithValue("@status", status);
                        command.Parameters.AddWithValue("@notes", notes);
                        command.Parameters.AddWithValue("@city", city);
                        command.Parameters.AddWithValue("@state", state);
                        command.Parameters.AddWithValue("@zipCode", zipCode);
                        command.Parameters.AddWithValue("@country", country);


                        command.ExecuteNonQuery();
                        MessageBox.Show("Supplier added successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        this.DialogResult = DialogResult.OK;
                        this.Close();
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to add supplier: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }


        private void txtPhone_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Allow only digits, one decimal point, and control characters (e.g., backspace)
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) && e.KeyChar != '.')
            {
                e.Handled = true; // Reject the input
            }

            // Allow only one decimal point
            if (e.KeyChar == '.' && (sender as TextBox).Text.Contains("."))
            {
                e.Handled = true; // Reject the input
            }
        }

        private void txtPayment_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Allow only digits, one decimal point, and control characters (e.g., backspace)
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) && e.KeyChar != '.')
            {
                e.Handled = true; // Reject the input
            }

            // Allow only one decimal point
            if (e.KeyChar == '.' && (sender as TextBox).Text.Contains("."))
            {
                e.Handled = true; // Reject the input
            }
        }
    }
}
