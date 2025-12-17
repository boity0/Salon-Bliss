import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiClock, FiUser, FiScissors } from 'react-icons/fi';
import './BookingForm.css';

const BookingForm = () => {
  const { user, isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    service_id: '',
    staff_id: '',
    appointment_date: '',
    start_time: '',
    notes: ''
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchServices();
    fetchStaff();
  }, []);

  useEffect(() => {
    if (selectedDate && formData.staff_id) {
      fetchTimeSlots();
    }
  }, [selectedDate, formData.staff_id]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to load services');
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff`);
      setStaff(response.data);
    } catch (error) {
      toast.error('Failed to load staff');
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const response = await axios.get(`${API_URL}/time-slots`, {
        params: {
          staff_id: formData.staff_id,
          date: dateStr
        }
      });
      setTimeSlots(response.data);
    } catch (error) {
      toast.error('Failed to load time slots');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      appointment_date: date.toISOString().split('T')[0]
    }));
  };

  const handleTimeSelect = (time) => {
    const selectedService = services.find(s => s.id === parseInt(formData.service_id));
    if (!selectedService) return;

    const [hours, minutes] = time.split(':').map(Number);
    const endTime = new Date(selectedDate);
    endTime.setHours(hours);
    endTime.setMinutes(minutes + selectedService.duration);
    
    setFormData(prev => ({
      ...prev,
      start_time: time,
      end_time: endTime.toTimeString().split(' ')[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      return;
    }

    if (!formData.service_id || !formData.appointment_date || !formData.start_time) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/appointments`, formData, {
        withCredentials: true
      });
      
      toast.success('Appointment booked successfully!');
      setFormData({
        service_id: '',
        staff_id: '',
        appointment_date: '',
        start_time: '',
        notes: ''
      });
      setSelectedDate(new Date());
    } catch (error) {
      toast.error(error.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const getServiceDuration = (serviceId) => {
    const service = services.find(s => s.id === parseInt(serviceId));
    return service ? service.duration : 60;
  };

  return (
    <div className="booking-form-container">
      <div className="booking-header">
        <h2><FiCalendar /> Book Your Appointment</h2>
        <p>Select your preferred service, stylist, and time</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Service Selection */}
        <div className="form-group">
          <label><FiScissors /> Select Service *</label>
          <div className="service-grid">
            {services.map(service => (
              <div 
                key={service.id}
                className={`service-option ${formData.service_id == service.id ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, service_id: service.id }))}
              >
                <div className="service-icon">
                  <FiScissors />
                </div>
                <div className="service-info">
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                  <div className="service-details">
                    <span className="duration">{service.duration} min</span>
                    <span className="price">${service.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Selection */}
        <div className="form-group">
          <label><FiUser /> Select Stylist (Optional)</label>
          <div className="staff-grid">
            {staff.map(member => (
              <div 
                key={member.id}
                className={`staff-option ${formData.staff_id == member.id ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, staff_id: member.id }))}
              >
                <div className="staff-avatar">
                  {member.name.charAt(0)}
                </div>
                <div className="staff-info">
                  <h4>{member.name}</h4>
                  <p className="specialization">{member.specialization}</p>
                  <div className="staff-rating">
                    <span className="rating">⭐ {member.rating}</span>
                    <span className="experience">10+ years</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="form-group">
          <label><FiCalendar /> Select Date *</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            className="date-picker"
            placeholderText="Select appointment date"
          />
        </div>

        {/* Time Slots */}
        {formData.service_id && selectedDate && (
          <div className="form-group">
            <label><FiClock /> Select Time *</label>
            <div className="time-slots-grid">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  className={`time-slot ${formData.start_time === time ? 'selected' : ''}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time.slice(0, 5)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Additional Notes */}
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any special requests or requirements..."
            rows="3"
          />
        </div>

        {/* Summary */}
        {formData.service_id && formData.start_time && (
          <div className="booking-summary">
            <h4>Appointment Summary</h4>
            <div className="summary-details">
              <div className="summary-item">
                <span>Service:</span>
                <span>{services.find(s => s.id == formData.service_id)?.name}</span>
              </div>
              <div className="summary-item">
                <span>Date:</span>
                <span>{selectedDate.toLocaleDateString()}</span>
              </div>
              <div className="summary-item">
                <span>Time:</span>
                <span>{formData.start_time.slice(0, 5)}</span>
              </div>
              <div className="summary-item">
                <span>Duration:</span>
                <span>{getServiceDuration(formData.service_id)} minutes</span>
              </div>
              <div className="summary-item">
                <span>Stylist:</span>
                <span>{staff.find(s => s.id == formData.staff_id)?.name || 'Any available'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading || !formData.service_id || !formData.start_time}
        >
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

