---
title: "Revision Problems"
short_title: "Revision Problems"
---

This is a short set of revision problems for you to attempt. Most of these questions should be straightforward, potentially after a little revision, especially those covering first year topics. If any of the questions prove challenging, then it is an indication that you may need to spend some more time revising these topics. We will make use of all of these topics extensively in this unit, so please do spend time making sure you are confident on these topics.

# Complex numbers

````{exercise}
Consider the complex number $z = 1 + \sqrt{3} i$. 
1. Write down the complex conjugate $z^*$, the real part $\mathrm{Re}(z)$ and the imaginary part $\mathrm{Im}(z)$ of $z$.
1. Calculate the modulus-squared $|z|^2$. 
1. Express $z$ in polar form, i.e. as $z = Re^{i\theta}$. 
1. Plot the points $z$ and $z^*$ in the complex plane.  
````

````{exercise}
Consider the complex number $z = 3e^{2i\pi/3}$. 
1. Write down the complex conjugate $z^*$, the real part $\mathrm{Re}(z)$ and the imaginary part $\mathrm{Im}(z)$ of $z$.
1. Calculate the modulus-squared $|z|^2$. 
1. Express $z$ in the form $z = x + iy$. 
1. Plot the points $z$ and $z^*$ in the complex plane.  
````

# Probabilities

````{exercise}
Consider a standard 6-sided die. If we note a face by $x$, for $x = 1, \ldots, 6$, then $\prob(x) = 1/6$. 
1. What is the probability of rolling an even number?
1. What is the probability of rolling a prime number?
1. What is the **expectation value** $\langle x \rangle$? Is this ever a physical outcome of the roll of the dice? If not, what is the significance of this value?
1. Imagine now that you have two dice. What is the probability that you roll 10 (in total)?
````


````{exercise}
Consider that a new and unstable particle is discovered. The particle has a lifetime which is never longer than $\tau$. The **probability density** that it decays at time $t$ grows linearly up until this time, and is given by $$ \pd(t) = \frac{2t}{\tau^2},$$
where $0 \leq t \leq \tau$ is the time as measured from its creation time.
1. Confirm that $\pd(t)$ is a normalised probability density. 
1. Calculate the **expected time of decay** $\langle t \rangle$. 
1. Calculate the standard deviation in the decay time $\Delta t = \sqrt{\langle t^2\rangle - \langle t \rangle^2}$.
````

# Quantum Physics

````{exercise}
Consider two quantum states $\ket{\psi_1} = \frac{1}{\sqrt{2}}(\ket{1} + \ket{2})$ and $\ket{\psi_2(\theta)} = \cos \theta \ket{1} + \sin \theta \ket{2}$, where $0 \leq \theta < 2\pi$, and $\ket{1}$ and $\ket{2}$ form an orthonormal basis. 
1. Confirm that both $\ket{\psi_1}$ and $\ket{\psi_2(\theta)}$ are normalised quantum states. 
1. Calculate the scalar product $\inner{\psi_1}{\psi_2(\theta)}$. Hence find a value of $\theta$ such that $\ket{\psi_2(\theta)}$ is orthogonal to $\ket{\psi_1}$. Call this value $\theta^*$.
1. Show that the operator $\hat{A} = \ket{\psi_1}\bra{\psi_1} - \ket{\psi_2(\theta^*)}\bra{\psi_2(\theta^*)}$ is Hermitian. What are its eigenvalues and eigenvectors?
1. Consider measuring $\hat{A}$ on $\ket{\psi_2(\pi/2)}$. What are the possible results of the measurement, what are their corresponding probabilities, and what is the state after measurement in each case?
````