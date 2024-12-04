---
title: "Chapter 3: Incompatible observables & the Heisenberg uncertainty principle" 
short_title: "Ch. 3: Incomp. Obs. & HUP"
numbering:
  enumerator: 3.%s
---

In this Chapter we will learn about one of the basic aspects of quantum mechanics — **incompatible observables** . As we will see in more detail below, quantum mechanics predicts that it is **impossible for a particle to have multiple definite properties at the same time**. For example, a particle cannot have a definite position and a definite momentum simultaneously, or a definite energy and a definite position (as just two examples). In fact, we can say much more than this, and this is really the main lesson: there is a strong **trade-off** between **how well-defined** properties can be. That is, if a particle has a fairly well defined position, this necessitates it having a broad spread of momenta. This is the content of the famous **Heisenberg uncertainty principle** (HUP), which we will introduce here. This is a fundamental fact about nature, and shows that certain observable properties are **incompatible** with each other. 

## Gaussian example

We can illustrate the main idea behind the incompatibility of position and momentum by considering a simple example — that of a **gaussian wavefunctions**. Consider the following family of wavefunctions 
```{math}
\psi_a(x) = \sqrt{\frac{1}{a\sqrt{2\pi}}} e^{-x^2/4a^2}
```
parameterised by $a > 0$, which determines the **width** of the wavefunction, and where $\sqrt{\frac{1}{a\sqrt{2\pi}}}$ is a normalisation factor, which ensures that this is a normalised wavefunction (this is left as an exercise). This wavefunction is depicted below:

As we can see, it has the Bell-curve shape (as expected), and is centred at the origin. Direct calculations show that the expected position and standard deviation are 
```{math}
\av{x} &= 0,\\
\Delta x &= \sqrt{\av{x^2} - \av{x}^2} = a.
```
The fact that the standard deviation $\Delta x$ is equal to $a$ is the reason we say that $a$ determines the width (since it uniquely specifies the standard deviation, which is a very useful and common way of quantifying the width of a probability density function). What does it mean for the particle to have a small width? It means that if we were to measure the position, we would be very likely to find the particle within a small region of space (in this case, close to the origin, since this is the only region where the probability density $p_a(x) = |\psi_a(x)|^2$ is large). This is where we should think of the quantum particle as being located, roughly speaking. If on the other hand $a$ becomes large, then the particle will be found in a much large region of space when we measure its position. 

The question we would now like to ask if what momentum does the particle have, as we consider varying the width of the spatial wavefunction $a$? We can answer this by finding the momentum wavefunction $\tilde{\psi}_a(p)$, which determines the probability density $p_a(p) = |\tilde{\psi}_a(p)|^2$ for the particle to have momentum $p$. 

In an exercise, you will show that
```{math}
\tilde{\psi}_a(p) = \sqrt{\frac{\sqrt{2}a}{\sqrt{2}\hbar}}e^{-a^2p/\hbar^2}.
```
(Remarkably) this is **also a Gaussian**. However, the expected momentum and standard deviation of momentum are 
```{math}
\av{p} &= 0,\\
\Delta p &= \sqrt{\av{p^2} - \av{p}^2} = \frac{\hbar}{2a}.
```
What we see is that the spread of momentum is now **inversely proportional** to $a$. This means that as we make $a$ smaller — so that the particle has a smaller width in space (more precisely, so that a measurement of the position of the particle is likely to find it closer to the origin), it has a bigger spread of momentum, meaning that a momentum measurement would find that the particle has large momentum with  higher probability. Conversely, as the wavefunction gets a wider width (a becomes large), the spread of momentum in fact goes down!. 

We often refer to these widths as **uncertainties**, since they tell us how uncertain our measurements of position and momentum will be, that is, how close or far we are from obtaining a very deterministic outcome when performing a measurement of that property of the particle. 

What is remarkable is that what we see above **isn't a property just of Gaussian wavefunctions**. In fact, 
> It is impossible in quantum mechancis for a particle to simultaneously have a small uncertainty $\Delta x$ in position and a small uncertainty $\Delta p$ in momentum