using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Sales_Order
{
    public partial class Form1 : Form
    {

        private bool isSidebarExpanded = true;
        dashboardUserControl dashboard = new dashboardUserControl();
        customerUserControl customer = new customerUserControl();
        apitestUserControl apitest = new apitestUserControl();
        productUserControl product = new productUserControl();
        supplierUserControl supplier = new supplierUserControl();

        public Form1()
        {
            InitializeComponent();
            menu.Click += Menu_Click;
            menuButton.Click += Menu_Click;
        }

        private void Menu_Click(object sender, EventArgs e)
        {
            if (isSidebarExpanded)
            {
                // Minimize the sidebar
                sidebarPanel.Width = 45;
                panel.Location = new Point(50, 37);
                panel.Size = new Size(1120, 556);
            }
            else
            {
                // Expand the sidebar
                sidebarPanel.Width = 183;
                panel.Location = new Point(190, 37);
                panel.Size = new Size(993, 571);
            }
            isSidebarExpanded = !isSidebarExpanded; // Toggle the state
        }

        private void dashboardButton_Click(object sender, EventArgs e)
        {
            panel.Controls.Clear();
            panel.Controls.Add(dashboard);
            dashboard.Dock = DockStyle.Fill;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            panel.Controls.Clear();
            panel.Controls.Add(dashboard);
            dashboard.Dock = DockStyle.Fill;
        }

        private void customerButton_Click(object sender, EventArgs e)
        {
            panel.Controls.Clear();
            panel.Controls.Add(customer);
            customer.Dock = DockStyle.Fill;
        }

        private void apitestButton_Click(object sender, EventArgs e)
        {
            panel.Controls.Clear();
            panel.Controls.Add(apitest);
            apitest.Dock = DockStyle.Fill;
        }

        private void productButton_Click(object sender, EventArgs e)
        {
            panel.Controls.Clear();
            panel.Controls.Add(product);
            product.Dock = DockStyle.Fill;
        }

        private void supplierButton_Click(object sender, EventArgs e)
        {
            panel.Controls.Clear();
            panel.Controls.Add(supplier);
            supplier.Dock = DockStyle.Fill;
        }
    }
}
