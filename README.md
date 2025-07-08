# Enhanced Cybersecurity Log Agent Dashboard

A modern, responsive React dashboard for monitoring and analyzing cybersecurity logs with advanced filtering, real-time updates, and comprehensive data visualization.

## Features

### 🔐 Security Monitoring
- Real-time log monitoring with automatic updates
- Color-coded threat detection (Allow/Block/Monitor)
- Confidence level indicators
- IP address tracking and analysis

### 📊 Advanced Analytics
- Interactive charts and visualizations
- Decision distribution analysis
- HTTP method statistics
- Status code trends
- Confidence level breakdown

### 🔍 Powerful Filtering
- Multi-field search (IP, URL, User Agent)
- Advanced filters for HTTP methods, decisions, confidence levels
- Date range filtering
- Saved filter combinations
- Real-time search with debouncing

### 📱 Responsive Design
- Mobile-first approach
- Card layout for mobile devices
- Table layout for desktop
- Responsive breakpoints
- Touch-friendly interface

### 🎨 Modern UI/UX
- Dark/Light mode toggle
- Chakra UI components
- Cybersecurity-themed color scheme
- Smooth animations and transitions
- Accessible design (WCAG 2.1 AA)

### 📈 Performance Optimized
- Virtual scrolling for large datasets
- Server-side pagination
- Debounced search queries
- Memoized components
- Efficient state management

## Technology Stack

- **Frontend**: React 18+ with Vite
- **UI Library**: Chakra UI v2
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **State Management**: React hooks
- **Styling**: Chakra UI with custom theming

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersecurity-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration file to create the `logagent` table
   - Configure Row Level Security (RLS)

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Database Schema

The application uses a `logagent` table with the following structure:

```sql
CREATE TABLE logagent (
  id serial PRIMARY KEY,
  ip_address text,
  method text,
  query_string text,
  user_agent text,
  decision text,
  confidence text,
  reasoning text,
  decision_maker text,
  url text,
  status bigint,
  timestamp timestamp DEFAULT NOW()
);
```

## Usage

### Dashboard Overview
- **Header**: Brand logo, refresh button, export functionality, theme toggle
- **Sidebar**: Statistics summary, key metrics, filter shortcuts
- **Main Content**: Log data with table/card view options
- **Charts**: Interactive analytics and visualizations

### Filtering and Search
- Use the search bar for quick text-based filtering
- Expand the filter panel for advanced options
- Apply multiple filters simultaneously
- Clear all filters with one click

### Data Export
- Export filtered data to CSV or JSON format
- Includes all visible columns and applied filters
- Filename includes current date for organization

### View Modes
- **Table View**: Comprehensive data display with sorting
- **Card View**: Mobile-friendly layout with key information
- **Charts View**: Analytics and data visualization

## Customization

### Theming
The application uses a custom Chakra UI theme with cybersecurity-focused colors:
- **Primary**: Blue (#2196f3) - Trust and security
- **Success**: Green (#4caf50) - Allowed requests
- **Error**: Red (#f44336) - Blocked requests
- **Warning**: Yellow (#ffc107) - Suspicious activity

### Color Coding
- **Decisions**: Green (Allow), Red (Block), Yellow (Monitor)
- **Confidence**: Green (High), Yellow (Medium), Red (Low)
- **Status Codes**: Green (2xx), Yellow (3xx), Red (4xx/5xx)

## Performance Considerations

- **Pagination**: Server-side pagination prevents loading large datasets
- **Debouncing**: Search queries are debounced to reduce API calls
- **Memoization**: Components are memoized to prevent unnecessary re-renders
- **Virtual Scrolling**: Available for extremely large datasets

## Security Features

- **Row Level Security**: Supabase RLS policies protect data access
- **Input Validation**: All user inputs are validated and sanitized
- **HTTPS Only**: All API communications use HTTPS
- **No Sensitive Data**: No credentials stored in client-side code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please create an issue in the GitHub repository or contact the development team.