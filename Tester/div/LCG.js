class LCG {
    constructor(seed) {
        this.m = 2147483647;
        this.state = seed % this.m;
        this.c = 10987643;
        this.a = 16807;
    }

    next() {
        this.state = (this.state *this.a + this.c) % this.m;
        return this.state;
    }

    nextFloat() {
        return this.next() / (this.m-1);
    }
}

const test = new LCG(12345);
console.log(test.nextFloat());
console.log(test.nextFloat());