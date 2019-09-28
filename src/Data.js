class Data {
  constructor(index_map, thresholds, data_stride) {
    this.backend_data = null;
    this.index_map = index_map;
    this.thresholds = thresholds;
    this.data_stride = thresholds.length;
    this.current_threshold = 0;
    this.upper_index = 0;
    this.lower_weight = 0.0;
    this.upper_weight = 0.0;
    this.sorted_data = new Array(index_map.length);
  }

  set_data(data) {
    this.backend_data = data;
    //this.data_min = Math.min(...data);
    //this.data_max = Math.max(...data);
  }

  min() {
    return this.sorted_data[0];
  }

  max() {
    return this.sorted_data[this.sorted_data.length-1];
  }

  second_max() {
    return this.sorted_data[this.sorted_data.length-2];
  }

  has_data() {
    return (this.backend_data != null);
  }

  length() {
    return this.index_map.length;
  }

  set_threshold(threshold) {
    this.current_threshold = threshold;
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
      this.sorted_data.sort();
    }
  }

  get_backend_index(i) {
    return this.index_map[i];
  }

  get_data(i) {
    const backend_index = this.index_map[i];
    if (backend_index >= 0) {
      const row_index = this.data_stride *
        backend_index;
      const upper_data = this.backend_data[row_index + this.upper_index];
      var data;
      if (this.lower_weight > 0) {
        const lower_data = this.backend_data[row_index + this.upper_index - 1];
        data = upper_data * this.upper_weight + lower_data * this.lower_weight;
      } else {
        data = upper_data;
      }
      return data;
    } else {
      // no data
      return NaN;
    }

  }
}

export default Data
