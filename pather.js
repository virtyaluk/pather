const littleMagic = function(line, start, end) {
    return line.map(function(li, ii) {
        if (ii >= start && ii <= end && li !== '#') {
            return '*';
        }

        return li;
    });
};

module.exports = function pather(data) {
    const lines = data.split('\n');
    let firstLine = null,
        lastLine = null,
        lastHashPos = null;

    lines.forEach(function(line, i) {
        const oc = line.indexOf('#');

        if (oc !== -1) {
            if (!firstLine) {
                firstLine = lastLine = i;
            } else {
                lastLine = i;
            }
        }
    });

    return lines.map(function(line, i) {
        let l = line.split(''),
            lHash = null;
        const firstHash = l.indexOf('#');

        if (i >= firstLine && i <= lastLine) {
            if (firstHash !== -1) {
                lHash = l.lastIndexOf('#');
                l = littleMagic(l, lastHashPos ? Math.min(firstHash, lastHashPos, lHash) : firstHash, Math.max(firstHash, lastHashPos, lHash));
                lastHashPos = firstHash < lastHashPos ? firstHash : lHash;
            } else if (lastHashPos !== null && firstHash === -1) {
                l[lastHashPos] = '*';
            }
        }

        return l.join('');
    }).join('\n');
};
