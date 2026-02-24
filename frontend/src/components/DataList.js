import PropTypes from 'prop-types';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .data-list {
    font-family: 'DM Sans', sans-serif;
  }

  .data-list-heading {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: #f0faf4;
    margin: 0 0 20px 0;
    letter-spacing: -0.2px;
  }

  .no-data {
    text-align: center;
    padding: 40px 20px;
    color: rgba(255,255,255,0.25);
    font-size: 14px;
    border: 1px dashed rgba(255,255,255,0.08);
    border-radius: 14px;
    background: rgba(255,255,255,0.02);
  }

  .data-items {
    display: grid;
    gap: 12px;
  }

  .data-item {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 18px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 20px;
    transition: border-color 0.2s, background 0.2s;
  }

  .data-item:hover {
    border-color: rgba(74, 222, 128, 0.2);
    background: rgba(74, 222, 128, 0.03);
  }

  .data-field {
    font-size: 13.5px;
    color: rgba(255,255,255,0.55);
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .data-field-label {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }

  .data-field-value {
    font-size: 15px;
    color: #e8f5ee;
    font-weight: 400;
  }

  .data-field-value.accent {
    color: #4ade80;
  }

  .data-field.full-width {
    grid-column: 1 / -1;
  }
`;

const DataList = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="data-list">
          <h3 className="data-list-heading">Wearable Data</h3>
          <p className="no-data">No data found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="data-list">
        <h3 className="data-list-heading">Wearable Data</h3>
        <div className="data-items">
          {data.map((item) => (
            <div key={item._id} className="data-item">
              <div className="data-field">
                <span className="data-field-label">Heart Rate</span>
                <span className="data-field-value accent">{item.heartRate} bpm</span>
              </div>
              <div className="data-field">
                <span className="data-field-label">Steps</span>
                <span className="data-field-value">{item.steps.toLocaleString()}</span>
              </div>
              <div className="data-field">
                <span className="data-field-label">Sleep Hours</span>
                <span className="data-field-value">{item.sleepHours}h</span>
              </div>
              <div className="data-field">
                <span className="data-field-label">Date</span>
                <span className="data-field-value">{new Date(item.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

DataList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      heartRate: PropTypes.number.isRequired,
      steps: PropTypes.number.isRequired,
      sleepHours: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DataList;