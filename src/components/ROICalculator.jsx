import React, { useState } from 'react';

const ROICalculator = () => {
    // Default values added based on DataDictionary_ROI.csv for easier testing
    const [formData, setFormData] = useState({
        business_name: 'My Business',
        industry: 'Other',
        primary_offer_type: 'one_off',
        price_per_unit: '100',
        customer_lifetime_value: '0',
        use_clv_for_revenue: false,
        gross_margin_pct: '60',
        lost_missed_calls: '50',
        lost_busy_with_clients: '40',
        lost_no_followup: '50',
        list_size: '1000',
        contact_rate_without_ai: '0.3',
        booking_rate_without_ai: '0.4',
        close_rate_without_ai: '0.25',
        contact_rate_with_ai: '0.6',
        booking_rate_with_ai: '0.5',
        close_rate_with_ai: '0.3',
        recapture_rate_missed_calls: '0.6',
        recapture_rate_busy: '0.6',
        recapture_rate_no_followup: '0.1',
        staff_hourly_cost: '30',
        staff_hours_saved_per_week: '10',
        automated_followup_cost_savings_per_month: '100',
        ai_plan_tier: 'starter',
        num_voice_agents: 0,
        agent_minutes_per_call: '3',
        agent_calls_per_month: '500',
        provider_cost_per_minute: '0.05',
        sms_cost_per_segment: '0.01',
        avg_sms_segments_per_convo: '3',
        email_cost_per_1k: '2',
        notes: ''
      });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setError('');

    // Replace with your actual n8n webhook URL if different
    const webhookUrl = 'https://primary-production-4fb7.up.railway.app/webhook/roi-intake';

    try {
      // Convert specific string fields to numbers before sending
      const numericFields = [
        'price_per_unit', 'customer_lifetime_value', 'gross_margin_pct', 'lost_missed_calls',
        'lost_busy_with_clients', 'lost_no_followup', 'list_size', 'contact_rate_without_ai',
        'booking_rate_without_ai', 'close_rate_without_ai', 'contact_rate_with_ai', 'booking_rate_with_ai',
        'close_rate_with_ai', 'recapture_rate_missed_calls', 'recapture_rate_busy', 'recapture_rate_no_followup',
        'staff_hourly_cost', 'staff_hours_saved_per_week', 'automated_followup_cost_savings_per_month',
        'num_voice_agents', 'agent_minutes_per_call', 'agent_calls_per_month', 'provider_cost_per_minute',
        'sms_cost_per_segment', 'avg_sms_segments_per_convo', 'email_cost_per_1k'
      ];
      
      const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          if (numericFields.includes(key) && value !== '') {
            return [key, Number(value)];
          }
          return [key, value];
        })
      );

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data[0]);

    } catch (err) {
      console.error('There was a problem with your fetch operation:', err);
      setError('Failed to calculate ROI. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Ai2Market ROI Calculator</h1>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* --- Section 1: Business Details --- */}
        <div className="p-4 border rounded-md bg-white">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">1. Business Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Gross Margin (%)</label>
                <input type="number" name="gross_margin_pct" value={formData.gross_margin_pct} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., 60" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Product/Service Price ($)</label>
                <input type="number" name="price_per_unit" value={formData.price_per_unit} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Customer Lifetime Value (CLV) ($)</label>
                <input type="number" name="customer_lifetime_value" value={formData.customer_lifetime_value} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="md:col-span-2 flex items-center">
                <input type="checkbox" name="use_clv_for_revenue" checked={formData.use_clv_for_revenue} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">Use CLV for Revenue Calculation</label>
            </div>
          </div>
        </div>

        {/* --- Section 2: Lost Opportunities & Recapture Rates --- */}
        <div className="p-4 border rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">2. Monthly Lost Opportunities & Recapture Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Headers */}
                <div></div>
                <div className="text-sm font-medium text-gray-600 text-center">Lost Opps / Month</div>
                <div className="text-sm font-medium text-gray-600 text-center">Recapture Rate w/ AI (%)</div>
                
                {/* Missed Calls */}
                <label className="text-sm font-medium text-gray-700 self-center">Missed Phone Calls</label>
                <input type="number" name="lost_missed_calls" value={formData.lost_missed_calls} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 50" />
                <input type="number" step="0.01" name="recapture_rate_missed_calls" value={formData.recapture_rate_missed_calls} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.6 for 60%" />

                {/* Busy Clients */}
                <label className="text-sm font-medium text-gray-700 self-center">Unable to Answer (Busy)</label>
                <input type="number" name="lost_busy_with_clients" value={formData.lost_busy_with_clients} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 40" />
                <input type="number" step="0.01" name="recapture_rate_busy" value={formData.recapture_rate_busy} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.6 for 60%" />

                {/* No Follow-up */}
                <label className="text-sm font-medium text-gray-700 self-center">No Follow-up Capacity</label>
                <input type="number" name="lost_no_followup" value={formData.lost_no_followup} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 50" />
                <input type="number" step="0.01" name="recapture_rate_no_followup" value={formData.recapture_rate_no_followup} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.1 for 10%" />
            </div>
        </div>

        {/* --- Section 3: Conversion Funnel Rates --- */}
        <div className="p-4 border rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">3. Conversion Funnel Rates (%)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Headers */}
                <div></div>
                <div className="text-sm font-medium text-gray-600 text-center">Without AI (%)</div>
                <div className="text-sm font-medium text-gray-600 text-center">With AI (%)</div>

                {/* Contact Rate */}
                <label className="text-sm font-medium text-gray-700 self-center">Contact Rate</label>
                <input type="number" step="0.01" name="contact_rate_without_ai" value={formData.contact_rate_without_ai} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.3 for 30%" />
                <input type="number" step="0.01" name="contact_rate_with_ai" value={formData.contact_rate_with_ai} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.6 for 60%" />

                {/* Booking Rate */}
                <label className="text-sm font-medium text-gray-700 self-center">Booking Rate</label>
                <input type="number" step="0.01" name="booking_rate_without_ai" value={formData.booking_rate_without_ai} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.4 for 40%" />
                <input type="number" step="0.01" name="booking_rate_with_ai" value={formData.booking_rate_with_ai} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.5 for 50%" />

                {/* Close Rate */}
                <label className="text-sm font-medium text-gray-700 self-center">Close Rate</label>
                <input type="number" step="0.01" name="close_rate_without_ai" value={formData.close_rate_without_ai} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.25 for 25%" />
                <input type="number" step="0.01" name="close_rate_with_ai" value={formData.close_rate_with_ai} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 0.3 for 30%" />
            </div>
        </div>

        {/* --- Section 4: Cost Savings --- */}
        <div className="p-4 border rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">4. Cost Savings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Staff Hours Saved / Week</label>
                    <input type="number" name="staff_hours_saved_per_week" value={formData.staff_hours_saved_per_week} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 10" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Staff Hourly Cost ($)</label>
                    <input type="number" name="staff_hourly_cost" value={formData.staff_hourly_cost} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 30" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Other Monthly Savings ($)</label>
                    <input type="number" name="automated_followup_cost_savings_per_month" value={formData.automated_followup_cost_savings_per_month} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 100" />
                </div>
            </div>
        </div>
        
        {/* --- Submit Button --- */}
        <div>
            <button type="submit" className="w-full mt-2 bg-indigo-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate ROI'}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </form>

      {/* --- Results Display --- */}
      {results && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg border border-indigo-100">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">Your Estimated ROI Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-6">
            <div className="p-4 bg-green-100 rounded-lg">
              <p className="font-semibold text-green-800 text-sm uppercase tracking-wide">Monthly Net Gain</p>
              <p className="text-3xl font-bold text-green-900">${results.metrics.net.net_gain_monthly.toFixed(0)}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <p className="font-semibold text-blue-800 text-sm uppercase tracking-wide">ROI %</p>
              <p className="text-3xl font-bold text-blue-900">{results.metrics.net.roi_pct.toFixed(0)}%</p>
            </div>
             <div className="p-4 bg-yellow-100 rounded-lg">
              <p className="font-semibold text-yellow-800 text-sm uppercase tracking-wide">Payback Period</p>
              <p className="text-3xl font-bold text-yellow-900">
                {results.metrics.net.payback_months !== null ? `${results.metrics.net.payback_months.toFixed(1)} mo` : 'N/A'}
              </p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <p className="font-semibold text-purple-800 text-sm uppercase tracking-wide">Incremental Revenue</p>
              <p className="text-3xl font-bold text-purple-900">${results.metrics.revenue.incremental_revenue.toFixed(0)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2 p-3 bg-gray-50 rounded">
                <h4 className="font-semibold text-gray-700">Gains Breakdown</h4>
                <div className="flex justify-between"><span>Incremental Profit:</span> <span className="font-medium">${results.metrics.revenue.incremental_gross_profit.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Staff Savings:</span> <span className="font-medium">${results.metrics.savings.staff.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Other Savings:</span> <span className="font-medium">${results.metrics.savings.automated_followup.toFixed(0)}</span></div>
            </div>
             <div className="space-y-2 p-3 bg-gray-50 rounded">
                <h4 className="font-semibold text-gray-700">Costs Breakdown (Monthly)</h4>
                <div className="flex justify-between"><span>Platform Subscription:</span> <span className="font-medium">${results.metrics.costs.platform_subscriptions.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Usage Costs (SMS/Email/Voice):</span> <span className="font-medium">${(results.metrics.costs.minutes + results.metrics.costs.sms + results.metrics.costs.email).toFixed(0)}</span></div>
                <div className="flex justify-between border-t pt-1 font-bold"><span>Total Costs:</span> <span className="font-medium">${results.metrics.costs.total_monthly.toFixed(0)}</span></div>
            </div>
             <div className="space-y-2 p-3 bg-gray-50 rounded">
                <h4 className="font-semibold text-gray-700">Sales Funnel (With AI)</h4>
                <div className="flex justify-between"><span>Regained Opportunities:</span> <span className="font-medium">{results.metrics.regained.opportunities.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>New Bookings:</span> <span className="font-medium">{results.metrics.regained.bookings.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>New Sales:</span> <span className="font-medium">{results.metrics.regained.sales.toFixed(0)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;