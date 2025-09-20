# Bank Transfer Application

A modern, secure bank transfer application built with React, TypeScript, and Vite. This application provides a seamless multi-step transfer process with account selection, payee management, amount entry, and transaction confirmation.

## 🚀 Features

- **Multi-step Transfer Process**: Guided workflow from account selection to transfer completion
- **Account Management**: Select from multiple account types (Savings, Current, Credit)
- **Payee Selection**: Choose from saved payees with detailed information
- **Payee Information View**: Comprehensive payee details with transfer option
- **Amount Entry**: Secure amount input with validation
- **Transaction Guard**: Route protection ensuring proper flow completion
- **Success Confirmation**: Clear transaction summary and completion status
- **Responsive Design**: Mobile-friendly interface with modern UI
- **TypeScript Support**: Full type safety and IntelliSense

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: CSS3 with Flexbox
- **Development**: ESLint + TypeScript ESLint

## 📁 Project Structure

```
src/
├── assets/
│   └── react.svg           # React logo asset
├── Account.tsx             # Account selection page
├── Account.css             # Account page styles
├── Amount.tsx              # Transfer amount entry page
├── Amount.css              # Amount page styles
├── App.tsx                 # Main application component
├── App.css                 # Global application styles
├── Context.tsx             # Transaction state management
├── Gaurd.tsx               # Route protection component
├── Payee.tsx               # Payee selection page
├── Payee.css               # Payee page styles
├── PayeeInfo.tsx           # Payee information view
├── PayeeInfo.css           # Payee info styles
├── Success.tsx             # Transaction success page
├── Success.css             # Success page styles
├── index.css               # Base CSS styles
├── main.tsx                # Application entry point
└── vite-env.d.ts           # Vite environment types
```

## 🚦 Application Flow

1. **Account Selection** (`/`)
   - Display available accounts with balances
   - Select source account for transfer

2. **Payee Selection** (`/transfer/payee`)
   - Choose from saved payees
   - View payee information
   - Protected route (requires account selection)

3. **Amount Entry** (`/transfer/amount`)
   - Enter transfer amount
   - Display transfer summary
   - Protected route (requires payee selection)

4. **Success Confirmation** (`/transfer/success`)
   - Show transaction completion
   - Display transfer details
   - Option to return to accounts

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Bank_app/my-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Styling & Design

- **Color Scheme**: 
  - Blue theme for account selection
  - Green theme for payee selection
  - Orange theme for amount entry
  - Success green for completion
- **Layout**: Card-based design with shadows and hover effects
- **Typography**: System fonts (Segoe UI, Tahoma, Geneva, Verdana)
- **Responsive**: Mobile-first approach with breakpoints

## 🔒 Security Features

- **Route Protection**: TransactionGuard prevents unauthorized access
- **State Validation**: Ensures required data exists before proceeding
- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Form validation for amount entry

## 📱 Components Overview

### TransactionProvider
- Manages global transaction state
- Provides step data management
- Handles transaction reset

### TransactionGuard
- Protects routes from unauthorized access
- Redirects to appropriate step if data missing
- Ensures proper flow completion

### Account Selection
- Displays mock accounts with details
- Shows account type, number, and balance
- Navigates to payee selection on selection

### Payee Management
- Lists available payees
- Provides payee information view
- Dual action buttons (Select/Info)

### Amount Entry
- Secure amount input
- Transfer summary display
- Validation and confirmation

### Success Page
- Transaction completion confirmation
- Transfer details summary
- Return to accounts option

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- ESLint configuration for TypeScript
- Consistent naming conventions
- Component-based architecture
- Separation of concerns

## 🔮 Future Enhancements

- [ ] Real API integration
- [ ] User authentication
- [ ] Transaction history
- [ ] Multiple currency support
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Dark mode support
- [ ] Accessibility improvements

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.
