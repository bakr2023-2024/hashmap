class HashMap {
  constructor(initialCapacity = 8, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity);
    this.size = 0;
    this.loadFactor = loadFactor;
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
    }
    return hash;
  }

  getIndex(key) {
    const hashValue = this.hash(key);
    return hashValue % this.buckets.length;
  }

  resize() {
    const newCapacity = this.buckets.length * 2;
    const newBuckets = new Array(newCapacity);

    this.buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(([key, value]) => {
          const newIndex = this.hash(key) % newCapacity;
          if (!newBuckets[newIndex]) {
            newBuckets[newIndex] = [];
          }
          newBuckets[newIndex].push([key, value]);
        });
      }
    });

    this.buckets = newBuckets;
  }

  set(key, value) {
    const index = this.getIndex(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const entry = this.buckets[index].find(([k]) => k === key);

    if (entry) {
      entry[1] = value;
    } else {
      this.buckets[index].push([key, value]);
      this.size++;

      if (this.size > this.buckets.length * this.loadFactor) {
        this.resize();
      }
    }
  }

  get(key) {
    const index = this.getIndex(key);
    if (this.buckets[index]) {
      const entry = this.buckets[index].find(([k]) => k === key);
      return entry ? entry[1] : null;
    }
    return null;
  }

  has(key) {
    const index = this.getIndex(key);
    return !!this.buckets[index] && !!this.buckets[index].find(([k]) => k === key);
  }

  remove(key) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];

    if (bucket) {
      const entryIndex = bucket.findIndex(([k]) => k === key);
      if (entryIndex !== -1) {
        bucket.splice(entryIndex, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(8);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    this.buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(([key]) => {
          allKeys.push(key);
        });
      }
    });
    return allKeys;
  }

  values() {
    const allValues = [];
    this.buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(([, value]) => {
          allValues.push(value);
        });
      }
    });
    return allValues;
  }

  entries() {
    const allEntries = [];
    this.buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(entry => {
          allEntries.push([...entry]);
        });
      }
    });
    return allEntries;
  }
}
