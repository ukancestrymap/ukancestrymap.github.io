class Data {
  constructor(index_map) {
    this.backend_data = null;
    this.index_map = index_map;
    this.thresholds = null;
    this.data_stride = 0;
    this.current_threshold = 0;
    this.upper_index = 0;
    this.lower_weight = 0.0;
    this.upper_weight = 0.0;
    this.sorted_data = new Array(index_map.length);
  }

  set_data(data, thresholds) {
    this.backend_data = data;
    this.thresholds = thresholds;
    this.data_stride = thresholds.length;
    console.log(`data_stride = ${this.data_stride}`);
    //this.data_min = Math.min(...data);
    //this.data_max = Math.max(...data);
  }

  min() {
    return this.has_data() ? this.sorted_data[0].mean : 0.0;
  }

  max() {
    return this.has_data() ? this.sorted_data[this.sorted_data.length-1].mean : 1.0;
  }

  second_max() {
    return this.has_data() ? this.sorted_data[this.sorted_data.length-2].mean : 1.0;
  }

  has_data() {
    return (this.backend_data != null);
  }

  length() {
    return this.index_map.length;
  }

  get_thresholds() {
    return this.has_data() ? this.thresholds : [0, 1, 2];
  }

  set_threshold(threshold) {
    if (!this.has_data()) {
      return
    }
    this.upper_index = this.thresholds.findIndex((i) => i > threshold);
    if (this.upper_index === -1) {
      this.upper_index = this.thresholds.length - 1;
    }
    if (this.upper_index === 0) {
      this.lower_weight = 0;
    } else {
      this.lower_weight = (this.thresholds[this.upper_index] - threshold) / (this
        .thresholds[
          this.upper_index] - this.thresholds[
          this.upper_index - 1]);
    }
    this.upper_weight = 1 - this.lower_weight;

    // get sorted data for this threshold
    if (this.has_data()) {
      for (var i = 0; i < this.index_map.length; i++) {
        this.sorted_data[i] = this.get_data(i);
      }
      this.sorted_data.sort((a, b) => a.mean - b.mean);
    }
  }

  get_backend_index(i) {
    return this.index_map[i];
  }

  get_data(i) {
    const number_of_stats = 3;
    const backend_index = this.index_map[i];
    if (backend_index >= 0) {
      const row_index = number_of_stats * this.data_stride *
        backend_index;
      const data_index = row_index + number_of_stats * this.upper_index;
      const upper_data = this.backend_data.slice(data_index, data_index+3);
      var data;
      if (this.lower_weight > 0) {
        const lower_data_index = row_index + number_of_stats* (this.upper_index - 1);
        const lower_data = this.backend_data.slice(lower_data_index, lower_data_index+3);
        data = {
          lower_95: upper_data[0] * this.upper_weight + lower_data[0] * this.lower_weight, 
          mean: upper_data[1] * this.upper_weight + lower_data[1] * this.lower_weight, 
          upper_95: upper_data[2] * this.upper_weight + lower_data[2] * this.lower_weight,
        }
      } else {
        data = {
          lower_95: upper_data[0], 
          mean: upper_data[1], 
          upper_95: upper_data[2]
        }
      }
      return data;
    } else {
      // no data
      return NaN;
    }

  }
}

export default Data
