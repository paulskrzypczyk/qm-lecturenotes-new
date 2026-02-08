---
title: "Problem Class Week 15 Problems"
short_title: "Week 15"
numbering: false
---

These are the problems that we will solve during the problem class in week 15. **You are not expected to attempt these questions in advance of the problem class.** We will work through them in sequence, going through the solutions after everybody has time to attempt the questions.

I have included **additional questions** for you to attempt / discuss if you complete the questions before we go over the solution. If you also complete these, please work through [](w15-problems.md)

## Problems

````{tip .simple} Problem 1
Consider a particle of mass $M$ confined into an **infinite square well** with walls at $x = 0$ and $x = L$. The initial state of the particle is the ground state $\ket{\psi_\mathrm{in}} = \ket{E_1}$, with corresponding initial wavefunction $\psi_\mathrm{in}(x) = u_1(x) = \sqrt{\frac{2}{L}}\sin \frac{\pi x}{L}$ (inside the well, and vanishing outside).  

1. **Write down** the state $\ket{\psi(t)}$ of the particle at time $t$, assuming that the state at $t = 0$ is $\ket{\psi_\mathrm{in}}$. 
2. **Write down** the wavefunction $\psi(x,t)$ of the particle at time $t$, as well as the associated probability density $\pd(x,t)$. 
3. **Describe** qualitatively how the particle evolves in time. 

Consider now that the well is switched off at time $t = t_\mathrm{off}$. That is, $V(x) = 0$ from $t = t_\mathrm{off}$ onwards, so that the particle becomes **free**.

4. Write down (as an **integral**) the state of the particle at a time $t > t_\mathrm{off}$. You may use the result of [](#ex-7-4). Namely, that the **momentum wavefunction** corresponding to $u_1(x)$ is ![](#e-mom-wf-isw-eig)


```{dropdown} Additional questions
5. Use Desmos (or otherwise) to plot $\pd(x,t)$ for $t > t_\mathrm{off}$.
6. Explain why the evolution is qualitatively so different before and after the well is switched off. 
7. What do you think would happen if a harmonic oscillator potential was switched on at some later time (say $t = 2t_\mathrm{off}$)?
```
````

````{tip .simple} Problem 2
The first two energy eigenfunctions of the QHO are 

\begin{align}
u_0(x) &= \sqrt{\frac{1}{\ell\sqrt{\pi}}} e^{-x^2/2\ell^2}, & u_1(x) &= \sqrt{\frac{2}{\ell\sqrt{\pi}}}\frac{x}{\ell} e^{-x^2/2\ell^2},
\end{align}
where $\ell = \sqrt{\frac{\hbar}{M\omega}}$, $M$ is the mass of the particle, and $\omega$ is the (classical) frequency of the oscillator. 

Consider the initial wavefunction 

$$ \psi_\mathrm{in}(x) = \sqrt{\frac{2}{3\ell \sqrt{\pi}}}\left(1+\frac{x}{\ell}\right)e^{-x^2/2\ell^2}.$$

1. **By inspection** (i.e. by comparing coefficients), write $\psi_\mathrm{in}(x)$ in the form $\psi_\mathrm{in}(x) = \alpha u_0(x) + \beta u_1(x)$, for suitable constants $\alpha$ and $\beta$. 

2. Use part 1 to **write down** the quantum state $\ket{\psi_\mathrm{in}}$ of the particle, as a superposition of energy eigenstates $\ket{E_0}$ and $\ket{E_1}$. 

3. If the energy of the particle is **measured**, what are the possible outcomes, and what are their corresponding **probabilities**?

4. If the quantum state of the particle at $t = 0$ is $\ket{\psi_\mathrm{in}}$, use the **superposition principle** to write down the quantum state $\ket{\psi(t)}$ of the particle at time $t$. 

```{dropdown} Additional questions
5. **Write down** the wavefunction of the particle $\psi(x,t)$ at time $t$. 
6. Calculate the probability density $\pd(x,t)$ of the particle at time $t$. 
7. Use desmos (or otherwise) to animate $\pd(x,t)$ in time, and qualitatively describe the evolution of the particle. Does the evolution intuitively make sense? 
```
````

````{tip .simple} Problem 3
 Consider two distinct particles, one confined in an **infinite square well** of width $L$ (with walls at $x = 0$ and $x = L$), and the second confined in an well of width $\mathcal{L} = L/2$ (with walls at $x = 0$ and $x = \mathcal{L}$). 

 In each case, we will consider a particle prepared in the $n^\mathrm{th}$ energy eigenstate of the well $\ket{E_n}$. 

 1. What is the energy of each particle? 
 2. How many times bigger is the energy of the particle in the well of width $\mathcal{L}$?
 3. For each well, **write down** an expression (as an integral) for the **average squared-position** of the particle $\langle x^2 \rangle$ (you do not need to solve this integral!)
 4. How many times larger is $\langle x^2 \rangle$ for the particle in the well of width $L$ compared to the particle in the well of width $\mathcal{L} = L/2$. 

```{dropdown} Additional questions
5. By considering what the probability densities look like for different energy eigenfunctions, **without calculation** determine the average position of the particle in each well. 
6. Hence determine how the uncertainty (standard deviation) of the particle compares in the two wells.
7. Consider now the QHO: assume that the first well has characteristic length $\ell$, while the second has $\ell' = \ell/2$. Determine out how the classical frequencies $\omega$ and $\omega'$ relate to each other, and also the average potential energies $\langle V \rangle = \langle \frac{1}{2}M\omega^2 x^2\rangle$ and $\langle V' \rangle = \langle \frac{1}{2}M\omega'^2 x^2\rangle$. 
```
````

## Solutions

````{tip .simple} Solutions
:class: dropdown
Tuesday:
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/2025-6/Problem%20Class%20Solutions/Problem%20Class%20Week%2015%20Tues.pdf
:width: 100%
```
Thursday:
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/2025-6/Problem%20Class%20Solutions/Problem%20Class%20Week%2015%20Thurs.pdf
:width: 100%
```
````